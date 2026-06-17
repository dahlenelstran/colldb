import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    try {
        const figsResult = await pool.query("SELECT * FROM nonswfigs");
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