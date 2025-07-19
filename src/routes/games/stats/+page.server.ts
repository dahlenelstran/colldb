import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async () => {
    try {
        // Percent played overall

        const overallResults = await pool.query(`
            SELECT
                COUNT(*) AS total_games,
                SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) AS played_games,
                ROUND(100.0 * SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) / COUNT(*), 2) AS percent_played
            FROM games g;
        `);

        // Percent played by system

        const systemResults = await pool.query(`
            SELECT
                s.id AS system_id,
                s.title AS system_title,
                COUNT(DISTINCT gps.game_id) AS total_games,
                SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) AS played_games,
                ROUND(100.0 * SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) / COUNT(DISTINCT gps.game_id), 2) AS percent_played
            FROM systems s
            JOIN games_per_system gps ON s.id = gps.system_id
            JOIN games g ON gps.game_id = g.id
            GROUP BY s.id, s.title
            ORDER BY percent_played DESC;
        `);

        // Percent played by franchise

        const franchiseResults = await pool.query(`
            SELECT
                g.franchise,
                COUNT(*) AS total_games,
                SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) AS played_games,
                ROUND(100.0 * SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) / COUNT(*), 2) AS percent_played
            FROM games g
            GROUP BY g.franchise
            ORDER BY percent_played DESC;
        `);

        // Percent played by format

        const formatResults = await pool.query(`
            SELECT
                gps.format,
                COUNT(DISTINCT gps.game_id) AS total_games,
                SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) AS played_games,
                ROUND(100.0 * SUM(CASE WHEN g.is_played THEN 1 ELSE 0 END) / COUNT(DISTINCT gps.game_id), 2) AS percent_played
            FROM games_per_system gps
            JOIN games g ON gps.game_id = g.id
            GROUP BY gps.format
            ORDER BY percent_played DESC;
        `);

        // Number of duplicate games

        const duplicateGames = await pool.query(`
            SELECT SUM(counts - 1) AS total_duplicates
            FROM (
                SELECT COUNT(*) AS counts
                FROM games_per_system
                GROUP BY game_id
                HAVING COUNT(*) > 1
            ) sub;
        `);

        const duplicates = duplicateGames.rows[0]?.total_duplicates ?? 0;

        return {
            overall: overallResults.rows[0],
            systems: systemResults.rows,
            franchises: franchiseResults.rows,
            formats: formatResults.rows,
            duplicates
        };
    } catch (error) {
        console.error('Error loading game stats:', error);
        throw new Error('Failed to load game stats');
    }
};