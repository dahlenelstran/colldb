import { pool } from "$lib/server/db";

export async function load({ params }) { 
    const { set_number } = params;
    try { 
        const setResult = await pool.query('SELECT * FROM lego WHERE lego.set_number = $1', [set_number]);

        const setData = setResult.rows;

        const theme_id = setData[0].theme_id;

        const themeResult = await pool.query('SELECT * FROM lego_themes WHERE lego_themes.id = $1', [theme_id]);

        const themeData = themeResult.rows;

        const set = {
            title: setData[0].title,
            year: setData[0].year,
            minifigs: setData[0].minifigs,
            pieces: setData[0].pieces,
            msrp: setData[0].msrp,
            set_number: setData[0].set_number,
            theme_title: themeData[0].title,
            licensed: themeData[0].licensed,
            theme_id: themeData[0].id,
            quantity: setData[0].quantity || 1,
            built: setData[0].built
        }

        return {
            set
        }
    }
    catch (error) {
        console.error("Error fetching set info");

        const set = {
            title: "",
            year: "",
            minifigs: "",
            pieces: "",
            msrp: "",
            set_number: set_number,
            theme_title: "",
            licensed: false,
            theme_id: null,
            quantity: 0,
            built: false
        }

        return {
            set
        }
    }
}