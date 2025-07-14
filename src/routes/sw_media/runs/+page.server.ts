import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    try {
        // Get all runs
        const runsResult = await pool.query('SELECT * FROM swmedia_comic_runs');
        let runs = runsResult.rows;

        // For each run, get issue count and issue info
        const issuesResult = await pool.query(`
            SELECT
                scr.id AS run_id,
                COUNT(sw.id) AS total_issues,
                COUNT(*) FILTER (WHERE sw.is_owned IS TRUE) AS issues_owned,
                COUNT(*) FILTER (WHERE sw.is_completed IS TRUE) AS issues_read
            FROM swmedia_comic_runs scr
            LEFT JOIN swmedia_comics sc ON scr.id = sc.run_id
            LEFT JOIN swmedia sw ON sc.swmedia_id = sw.id
            GROUP BY scr.id
        `);

        // Map run_id to issue data
        const issuesByRun: Record<string, any> = {};
        for (const row of issuesResult.rows) {
            issuesByRun[row.run_id] = {
                totalIssues: row.total_issues,
                issuesOwned: row.issues_owned,
                issuesRead: row.issues_read
            };
        }

        // Attach issue data to each run
        runs = runs.map(run => ({
            ...run,
            totalIssues: issuesByRun[run.id]?.totalIssues ?? 0,
            issuesOwned: issuesByRun[run.id]?.issuesOwned ?? 0,
            issuesRead: issuesByRun[run.id]?.issuesRead ?? 0
        }));

        // Sort runs as before
        function stripThe(title: string): string {
            return title.replace(/^the\s+/i, '').trim();
        }
        runs.sort((a, b) => stripThe(a.title).localeCompare(stripThe(b.title)));

        return { runs };
    }
    catch (error) {
        console.error("Error fetching database entries", error);
        return { runs: [] };
    }
}