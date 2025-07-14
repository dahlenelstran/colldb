import { pool } from "$lib/server/db";

export async function load({ params }) { 
    const { id } = params;
    try { 
        const infoResult = await pool.query('SELECT * FROM games WHERE games.id = $1', [id]);
        const info = infoResult.rows[0];

        // Get all system titles for this game
        const systemsResult = await pool.query(`
            SELECT s.title AS system, gps.format
            FROM systems s
            JOIN games_per_system gps ON s.id = gps.system_id
            WHERE gps.game_id = $1
        `, [id]);
        const systems = systemsResult.rows; // [{ system: "PC", format: "Digital" }, ...]

        const game = {
            title: info.title,
            is_played: info.is_played,
            franchise: info.franchise,
            id: info.id,
            systems
        };

        return { game };
    }
    catch (error) {
        console.error("Error fetching game info", error);

        return {
            game: {
                title: "",
                is_played: false,
                franchise: "",
                id: "",
                systems: []
            }
        };
    }
}