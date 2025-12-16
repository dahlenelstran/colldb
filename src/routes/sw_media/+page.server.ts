import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    let media: any[] = [];
    try {
        
        // Pulling filter options

        const generalResult = await pool.query('SELECT DISTINCT type, is_canon, is_owned, is_completed FROM swmedia');

        const types = [...new Set(generalResult.rows.map(r => r.type).filter(Boolean))];
        const is_canons = [...new Set(generalResult.rows.map(r => r.is_canon).filter(v => v !== null))];
        const is_owneds = [...new Set(generalResult.rows.map(r => r.is_owned).filter(v => v !== null))];
        const is_completeds = [...new Set(generalResult.rows.map(r => r.is_completed).filter(v => v !== null))];

        // Pulling type-specific options

        const gameResult = await pool.query('SELECT DISTINCT system FROM swmedia_games');

        const systems = [...new Set(gameResult.rows.map(r => r.system).filter(Boolean))];

        const bookResult = await pool.query('SELECT DISTINCT format, booktype FROM swmedia_books');

        const formats = [...new Set(bookResult.rows.map(r => r.format).filter(Boolean))];
        const bookTypes = [...new Set(bookResult.rows.map(r => r.booktype).filter(Boolean))];

        const comicRunsResult = await pool.query('SELECT DISTINCT title, year FROM swmedia_comic_runs WHERE title IS NOT NULL');
        const comicRuns = comicRunsResult.rows; // [{title: 'Darth Vader', year: 2015}, ...]

        const seasonResult = await pool.query('SELECT DISTINCT show FROM swmedia_seasons');

        const shows = [...new Set(seasonResult.rows.map(r => r.show).filter(Boolean))];

        // Pulling filtered results

        const type = url.searchParams.get('type');
        const is_canon = url.searchParams.get('canon');
        const is_owned = url.searchParams.get('owned');
        const is_completed = url.searchParams.get('completed');
        const search = url.searchParams.get('search');
        const system = url.searchParams.get('system');
        const format = url.searchParams.get('format');
        const bookType = url.searchParams.get('bookType');
        const title = url.searchParams.get('title');
        const show = url.searchParams.get('show');
        const sort = url.searchParams.get('sort') === 'asc' ? true : url.searchParams.get('sort') === 'desc' ? false : null;

        const runTitle = url.searchParams.get('runTitle');
        const runYear = url.searchParams.get('runYear');

        let query = `
            SELECT
            swmedia.*,
            swmedia_comic_runs.title AS run,
            swmedia_comic_runs.year AS run_year,
            swmedia_comics.issue,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT swmedia_games.system), NULL) AS systems,
            ARRAY_REMOVE(ARRAY_AGG(DISTINCT swmedia_books.format), NULL) AS formats,
            MAX(swmedia_books.booktype) AS booktype,
            MAX(swmedia_seasons.show) AS show
            FROM swmedia
            LEFT JOIN swmedia_comics ON swmedia.id = swmedia_comics.swmedia_id
            LEFT JOIN swmedia_comic_runs ON swmedia_comics.run_id = swmedia_comic_runs.id
            LEFT JOIN swmedia_games ON swmedia.id = swmedia_games.swmedia_id
            LEFT JOIN swmedia_books ON swmedia.id = swmedia_books.swmedia_id
            LEFT JOIN swmedia_seasons ON swmedia.id = swmedia_seasons.swmedia_id
        `;

        let conditions: string[] = [];
        let values: any[] = [];

        if (type) {
            conditions.push('type = $' + (values.length + 1));
            values.push(type);
        }
        if (is_canon) {
            conditions.push('is_canon = $' + (values.length + 1));
            values.push(is_canon === "true" ? true : is_canon === "false" ? false : is_canon);
        }
        if (is_owned) {
            conditions.push('is_owned = $' + (values.length + 1));
            values.push(is_owned === "true" ? true : is_owned === "false" ? false : is_owned);
        }
        if (is_completed) {
            conditions.push('is_completed = $' + (values.length + 1));
            values.push(is_completed === "true" ? true : is_completed === "false" ? false : is_completed);
        }
        if (search) {
            conditions.push('LOWER(title) LIKE $' + (values.length + 1));
            values.push(`%${search.toLowerCase()}%`);
        }

        // Type-specific conditions
        
        let gameConditions: string[] = [];

        if (system) {
            gameConditions.push('system = $' + (values.length + 1));
            values.push(system);
        }

        let bookConditions: string[] = [];

        if (format) {
            bookConditions.push('format = $' + (values.length + 1));
            values.push(format);
        }
        if (bookType) {
            bookConditions.push('booktype = $' + (values.length + 1));
            values.push(bookType);
        }

        let comicConditions: string[] = [];

        if (runTitle) {
            comicConditions.push('swmedia_comic_runs.title = $' + (values.length + 1));
            values.push(runTitle);
        }
        if (runYear) {
            comicConditions.push('swmedia_comic_runs.year = $' + (values.length + 1));
            values.push(runYear);
        }

        let seasonConditions: string[] = [];

        if (show) {
            seasonConditions.push('show = $' + (values.length + 1));
            values.push(show);
        }

        // Constructing the final query

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        if (gameConditions.length > 0) {
            query += ' AND EXISTS (SELECT 1 FROM swmedia_games WHERE swmedia.id = swmedia_games.swmedia_id AND ' + gameConditions.join(' AND ') + ')';
        }

        if (bookConditions.length > 0) {
            query += ' AND EXISTS (SELECT 1 FROM swmedia_books WHERE swmedia.id = swmedia_books.swmedia_id AND ' + bookConditions.join(' AND ') + ')';
        }

        if (comicConditions.length > 0) {
            query += ` AND EXISTS (
                SELECT 1 FROM swmedia_comics sc
                JOIN swmedia_comic_runs scr ON sc.run_id = scr.id
                WHERE sc.swmedia_id = swmedia.id AND ${comicConditions.join(' AND ')}
            )`;
        }

        if (seasonConditions.length > 0) {
            query += ' AND EXISTS (SELECT 1 FROM swmedia_seasons WHERE swmedia.id = swmedia_seasons.swmedia_id AND ' + seasonConditions.join(' AND ') + ')';
        }

        query += `
            GROUP BY
            swmedia.id,
            swmedia_comic_runs.title,
            swmedia_comic_runs.year,
            swmedia_comics.issue
        `;

        if (sort == true) {
            query += ` ORDER BY release_date ASC `;
        }

        if (sort == false) {
            query += ` ORDER BY release_date DESC `;
        }

        const mediaResult = await pool.query(query, values);
        media = mediaResult.rows;

        const runsResult = await pool.query(`
            SELECT
                swmedia_comics.swmedia_id,
                swmedia_comic_runs.title AS run,
                swmedia_comic_runs.year AS run_year,
                swmedia_comics.issue
            FROM swmedia_comics
            JOIN swmedia_comic_runs ON swmedia_comics.run_id = swmedia_comic_runs.id
        `);
        const comics = runsResult.rows;

        return { 
            // Filtered results

            media,
            comics,

            // General filter options

            types,
            is_canons,
            is_owneds,
            is_completeds,

            // Specific filter options
            systems,
            formats,
            bookTypes,
            comicRuns,
            shows
        };
    }
    catch (error) {
        console.error('Error fetching Star Wars media:', error);
        return { 
            media: [],
            types: [],
            is_canons: [],
            is_owneds: [],
            is_completeds: [],
            systems: [],
            formats: [],
            bookTypes: [],
            comicRuns: [],
            shows: [],
            error: 'Failed to load Star Wars media.'
        };
    }
}