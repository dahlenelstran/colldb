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

        const comicResult = await pool.query('SELECT DISTINCT run, issue FROM swmedia_comics');

        const runs = [...new Set(comicResult.rows.map(r => r.run).filter(Boolean))];
        const issues = [...new Set(comicResult.rows.map(r => r.issue).filter(Boolean))];

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
        const run = url.searchParams.get('run');
        const issue = url.searchParams.get('issue');
        const show = url.searchParams.get('show');

        let query = `
            SELECT
              swmedia.*,
              ARRAY_REMOVE(ARRAY_AGG(DISTINCT swmedia_games.system), NULL) AS systems,
              ARRAY_REMOVE(ARRAY_AGG(DISTINCT swmedia_books.format), NULL) AS formats,
              MAX(swmedia_books.booktype) AS booktype,
              MAX(swmedia_comics.run) AS run,
              MAX(swmedia_comics.issue) AS issue,
              MAX(swmedia_seasons.show) AS show
            FROM swmedia
            LEFT JOIN swmedia_games ON swmedia.id = swmedia_games.swmedia_id
            LEFT JOIN swmedia_books ON swmedia.id = swmedia_books.swmedia_id
            LEFT JOIN swmedia_comics ON swmedia.id = swmedia_comics.swmedia_id
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

        if (run) {
            comicConditions.push('run = $' + (values.length + 1));
            values.push(run);
        }
        if (issue) {
            comicConditions.push('issue = $' + (values.length + 1));
            values.push(issue);
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
            query += ' AND EXISTS (SELECT 1 FROM swmedia_comics WHERE swmedia.id = swmedia_comics.swmedia_id AND ' + comicConditions.join(' AND ') + ')';
        }

        if (seasonConditions.length > 0) {
            query += ' AND EXISTS (SELECT 1 FROM swmedia_seasons WHERE swmedia.id = swmedia_seasons.swmedia_id AND ' + seasonConditions.join(' AND ') + ')';
        }

        query += ' GROUP BY swmedia.id ORDER BY release_date DESC';

        const mediaResult = await pool.query(query, values);
        media = mediaResult.rows;


        return { 
            // Filtered results

            media,

            // General filter options

            types,
            is_canons,
            is_owneds,
            is_completeds,

            // Specific filter options
            systems,
            formats,
            bookTypes,
            runs,
            issues,
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
            runs: [],
            issues: [],
            shows: [],
            error: 'Failed to load Star Wars media.'
        };
    }
}