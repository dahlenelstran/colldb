import { pool } from "$lib/server/db";

export async function load({ params }) { 
    const { id } = params;
    try { 
        const infoResult = await pool.query('SELECT * FROM moviestv WHERE moviestv.id = $1', [id]);

        const info = infoResult.rows;

        const disc = {
            title: info[0].title,
            type: info[0].type,
            resolution: info[0].resolution,
            franchise: info[0].franchise,
            watched: info[0].watched,
            label: info[0].label,
            steelbook: info[0].steelbook,
            letterboxd: info[0].letterboxd,
            id: info[0].id
        }

        return {
            disc
        }
    }
    catch (error) {
        console.error("Error fetching disc info");

        const disc = {
            title: "",
            type: "",
            resolution: "",
            franchise: "",
            watched: "",
            label: "",
            steelbook: "",
            letterboxd: "",
            id: ""
        }

        return {
            disc
        }
    }
}