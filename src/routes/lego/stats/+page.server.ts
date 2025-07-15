import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async () => {
    try {
        const yearsResult = await pool.query(`SELECT DISTINCT year FROM lego WHERE year IS NOT NULL ORDER BY year ASC`);
        const years = yearsResult.rows.map(r => r.year);

        const themeResult = await pool.query(`SELECT id, title, licensed FROM lego_themes ORDER BY title ASC`);
        const themes = themeResult.rows;

        const result = await pool.query(`
            SELECT 
                lego.*, 
                lego_themes.id AS theme_id, 
                lego_themes.title AS theme_title, 
                lego_themes.licensed AS theme_licensed
            FROM lego
            JOIN lego_themes ON lego.theme_id = lego_themes.id
        `);

        // Each row is an object with all lego fields + theme_id, theme_title, theme_licensed
        const sets = result.rows.flatMap(row => 
            row.quantity > 1 
            ? Array(row.quantity).fill(row) 
            : [row]
        );

        return {
            sets, 
            years,
            themes
        };
    } catch (error) {
        console.error("Error fetching LEGO stats", error);
        return {
            sets: [], 
            years: [],
            themes: []
        };
    }
};