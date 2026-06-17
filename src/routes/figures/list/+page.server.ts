import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    try {
        const figsResult = await pool.query("SELECT figures.*, fig_line.title AS line_title, fig_line.scale AS scale FROM figures JOIN fig_line ON figures.line_id = fig_line.id");
        const figs = figsResult.rows;

        return {
            figs
        }
    }
    catch (error) {
        console.error("Error fetching figures:", error);
        return {
            figs: [],
            error: "Failed to fetch figures :("
        };
    }
}