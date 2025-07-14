import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    try {
        const search = url.searchParams.get('search');

        let query = 'SELECT * FROM games';
        let conditions: string[] = [];
        let values: any[] = [];

        if (search) {
            conditions.push('LOWER(title) LIKE $' + (values.length + 1));
            values.push(`%${search.toLowerCase()}%`);
        }

        if (url.searchParams.get('format')) {
            conditions.push(`EXISTS (
                SELECT 1 FROM games_per_system gps
                WHERE gps.game_id = games.id AND gps.format = $${values.length + 1}
            )`);
            values.push(url.searchParams.get('format'));
        }

        if (url.searchParams.get('system')) {
            conditions.push(`EXISTS (
                SELECT 1 FROM games_per_system gps
                WHERE gps.game_id = games.id AND gps.system_id = $${values.length + 1}
            )`);
            values.push(url.searchParams.get('system'));
        }

        if (url.searchParams.get('franchise')) {
            conditions.push('franchise = $' + (values.length + 1));
            values.push(url.searchParams.get('franchise'));
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        // Get all games
        const gamesResult = await pool.query(query, values);
        const games = gamesResult.rows;

        // Get all systems per game
        const systemsResult = await pool.query(`
            SELECT
                gps.game_id,
                s.id AS system_id,
                s.title AS system_name
            FROM games_per_system gps
            JOIN systems s ON gps.system_id = s.id
        `);

        // Group systems by game_id
        const systemsByGame: Record<string, { system_id: string, system_name: string }[]> = {};
        for (const row of systemsResult.rows) {
            if (!systemsByGame[row.game_id]) systemsByGame[row.game_id] = [];
            systemsByGame[row.game_id].push({
                system_id: row.system_id,
                system_name: row.system_name
            });
        }

        // Attach systems to each game
        const gamesWithSystems = games.map(game => ({
            ...game,
            systems: systemsByGame[game.id] ?? []
        }));

        // Get all system options
        const systemOptionsResult = await pool.query('SELECT id, title FROM systems ORDER BY title');
        const systemOptions = systemOptionsResult.rows;

        // Get all unique franchises
        const franchiseOptionsResult = await pool.query('SELECT DISTINCT franchise FROM games WHERE franchise IS NOT NULL ORDER BY franchise');
        const franchiseOptions = franchiseOptionsResult.rows.map(row => row.franchise);

        // Get all unique formats
        const formatOptionsResult = await pool.query('SELECT DISTINCT format FROM games_per_system WHERE format IS NOT NULL ORDER BY format');
        const formatOptions = formatOptionsResult.rows.map(row => row.format);

        return {
            games: gamesWithSystems,
            systemOptions,
            franchiseOptions,
            formatOptions
        };
    }
    catch (error) {
        console.error("Error fetching database entries", error);
        return {
            games: [],
            systemOptions: [],
            franchiseOptions: [],
            formatOptions: [],
            error: "Failed to load games data."
        };
    }
}