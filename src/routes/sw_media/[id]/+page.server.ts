import { pool } from "$lib/server/db";

export async function load({ params }) { 
    const { id } = params;
    try { 
        const infoResult = await pool.query('SELECT * FROM swmedia WHERE swmedia.id = $1', [id]);
        const info = infoResult.rows[0];

        // Query related tables
        const gameResult = await pool.query('SELECT * FROM swmedia_games WHERE swmedia_id = $1', [id]);
        const bookResult = await pool.query('SELECT * FROM swmedia_books WHERE swmedia_id = $1', [id]);
        const seasonResult = await pool.query('SELECT * FROM swmedia_seasons WHERE swmedia_id = $1', [id]);
        const comicResult = await pool.query('SELECT * FROM swmedia_comics WHERE swmedia_id = $1', [id]);

        return {
            media: {
                title: info.title,
                type: info.type,
                releaseDate: info.release_date,
                is_canon: info.is_canon,
                is_owned: info.is_owned,
                is_completed: info.is_completed,
                id: info.id
            },
            games: gameResult.rows,
            books: bookResult.rows,
            seasons: seasonResult.rows,
            comics: comicResult.rows
        }
    }
    catch (error) {
        console.error("Error fetching media info", error);

        return {
            media: {
                title: "",
                type: "",
                releaseDate: "",
                is_canon: "",
                is_owned: "",
                is_completed: "",
                id: id
            },
            games: null,
            books: null,
            seasons: null,
            comics: null
        }
    }
}