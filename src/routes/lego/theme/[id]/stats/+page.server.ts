import { pool } from "$lib/server/db";

export async function load({ params }) { 
    const { id } = params;
    try { 
        const setResult = await pool.query('SELECT * FROM lego WHERE lego.theme_id = $1', [id]);

        const sets = setResult.rows;

        const themeResult = await pool.query('SELECT * FROM lego_themes WHERE lego_themes.id = $1', [id]);

        const themeData = themeResult.rows;

        const theme = {
            title: themeData[0].title,
            id: themeData[0].id,
            licensed: themeData[0].licensed
        }

        return {
            sets,
            theme
        }
    }
    catch (error) {
        console.error("Error fetching set info");

        const sets: any[] = [];

        const theme = {
            title: "",
            id: null,
            licensed: false
        }

        return {
            sets,
            theme
        }
    }
}