import { pool } from "$lib/server/db";

export async function load({ params }) { 
    const { id } = params;
    try { 

        const runResult = await pool.query('SELECT * FROM swmedia_comic_runs WHERE id = $1', [id]);
        const run = runResult.rows[0];

        const issuesResult = await pool.query(`
            SELECT swmedia.*, swmedia_comics.issue
            FROM swmedia
            JOIN swmedia_comics ON swmedia.id = swmedia_comics.swmedia_id
            WHERE swmedia_comics.run_id = $1
        `, [id]);
        const issues = issuesResult.rows;

        return {
            run,
            issues
        }
    }
    catch (error) {
        console.error("Error fetching media info", error);

        return {
            run: {
                title: "",
                year: "",
                id: id
            },
            issues: []
        }
    }
}