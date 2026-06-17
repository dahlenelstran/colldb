import {pool} from "$lib/server/db"

export async function load({ params }) { 
    const { fig_id } = params;
    try {
        const figResult = await pool.query('SELECT * FROM figures WHERE id = $1', [fig_id]);

        const figData = figResult.rows;

        const line_id = figData[0].line_id;

        const lineResult = await pool.query('SELECT * FROM fig_line WHERE id = $1', [line_id]);

        const lineData = lineResult.rows;

        const figure = {
            id: figData[0].id,
            name: figData[0].name,
            line_id: lineData[0].id,
            line_title: lineData[0].title,
            stamp_year: figData[0].stamp_year,
            link: figData[0].link,
            owned: figData[0].owned,
            notes: figData[0].notes,
            media_source: figData[0].media_source,
            line_start: lineData[0].start,
            line_end: lineData[0].end,
            scale: lineData[0].scale
        }

        return {
            figure
        }
    }
    catch (error) {
        console.error("Error fetching figure info :(");

        const figure = {
            id: 0,
            name: "",
            line_id: 0,
            line_title: "",
            stamp_year: 0,
            link: "",
            owned: false,
            notes: "",
            media_source: "",
            line_start: 0,
            line_end: 0,
            scale: 0
        }

        return {
            figure
        }
    }
}