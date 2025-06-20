import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async () => {
    let discs: any[] = [];
    let results: any[] = [];
    try {
        const discsResult = await pool.query('SELECT * FROM moviestv');

        const discs = discsResult.rows;
        function stripThe(title: string): string {
            return title.replace(/^the\s+/i, '').trim();
        }
        discs.sort((a, b) => stripThe(a.title).localeCompare(stripThe(b.title)));

        return { 
            discs:discs
        };
    }
    catch (error) {
        console.error("Error fetching database entries", error);
        return {
            discs: []
        };
    }
}