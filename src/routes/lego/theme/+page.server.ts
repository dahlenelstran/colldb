import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async () => {
    try {

        const statsResult = await pool.query(`
            SELECT
                lego.theme_id,
                lego_themes.title AS theme_title,
                COUNT(*) AS set_count,
                MIN(lego.year) AS min_year,
                MAX(lego.year) AS max_year
            FROM lego
            JOIN lego_themes ON lego.theme_id = lego_themes.id
            GROUP BY lego.theme_id, lego_themes.title
            ORDER BY lego_themes.title
        `);
        const themes = statsResult.rows;

        return {
            themes
        }
    }
    catch (error) {
        console.error("Error fetching themes:", error);
        return {
            themes: []
        };
    }
}