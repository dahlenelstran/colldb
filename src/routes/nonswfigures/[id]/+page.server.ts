import {pool} from "$lib/server/db"

export async function load({ params }) { 
    const { id } = params;
    try {
        const figResult = await pool.query('SELECT * FROM nonswfigs WHERE id = $1', [id]);

        const figData = figResult.rows;

        if (figData[0].image === null || figData[0].image === undefined) {
            figData[0].image = "https://res.cloudinary.com/dxrq4f1v7/image/upload/q_auto/f_auto/v1781475194/IMG_6344_k5ck10.jpg";
        }

        const figure = {
            id: figData[0].id,
            name: figData[0].name,
            franchise: figData[0].franchise,
            line: figData[0].line,
            tags: figData[0].tags,
            image: figData[0].image
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
            franchise: 0,
            line: "",
            tags: "",
            image: "https://res.cloudinary.com/dxrq4f1v7/image/upload/q_auto/f_auto/v1781475194/IMG_6344_k5ck10.jpg"
        }

        return {
            figure
        }
    }
}