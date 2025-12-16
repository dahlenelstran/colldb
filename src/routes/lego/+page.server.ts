import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    try {
        let query = `
            SELECT lego.*, lego_themes.title AS theme_title, lego_themes.licensed
            FROM lego
            JOIN lego_themes ON lego.theme_id = lego_themes.id
        `;
        let conditions: string[] = [];
        let values: any[] = [];

        if (url.searchParams.get('search')) {
            conditions.push('LOWER(lego.title) LIKE $' + (values.length + 1));
            values.push(`%${url.searchParams.get('search')!.toLowerCase()}%`);
        }
        if (url.searchParams.get('year')) {
            conditions.push('lego.year = $' + (values.length + 1));
            values.push(url.searchParams.get('year'));
        }
        if (url.searchParams.get('theme')) {
            conditions.push('lego.theme_id = $' + (values.length + 1));
            values.push(url.searchParams.get('theme'));
        }
        if (url.searchParams.get('license')) {
            conditions.push('lego_themes.licensed = $' + (values.length + 1));
            values.push(url.searchParams.get('license') === "true");
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ` ORDER BY year DESC `;

        const setsResult = await pool.query(query, values);
        const sets = setsResult.rows;

        // Get all unique years
        const yearOptionsResult = await pool.query('SELECT DISTINCT year FROM lego ORDER BY year DESC');
        const yearOptions = yearOptionsResult.rows.map(row => row.year);

        // Get all themes
        const themeOptionsResult = await pool.query('SELECT id, title FROM lego_themes ORDER BY title');
        const themeOptions = themeOptionsResult.rows;

        // Pass to page
        return {
            sets,
            yearOptions,
            themeOptions
        };
    }
    catch (error) {
        console.error("Error fetching database entries", error);
        return {
            sets: [],
            yearOptions: [],
            themeOptions: [],
            error: "Failed to load sets data."
        };
    }
}