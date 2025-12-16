import { pool } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from './$types';

export const actions: Actions = {
    async edit(event) {
        const { request, params } = event;
        const formData = await request.formData();
        const { id } = params;
        const title = formData.get('title')?.toString() || '';
        const type = formData.get('type')?.toString() || '';
        const resolution = formData.get('resolution')?.toString() || '';
        const franchise = formData.get('franchise')?.toString() || '';
        const watched = formData.get('watched')?.toString() || '';
        const label = formData.get('label')?.toString() || '';
        const steelbook = formData.get('steelbook')?.toString() || '';
        const letterboxd = formData.get('letterboxd')?.toString() || '';

        try {
            await pool.query(
                'UPDATE moviestv SET title = $1, type = $2, resolution = $3, franchise = $4, watched = $5, label = $6, steelbook = $7, letterboxd = $8 WHERE id = $9', 
                [title, type, resolution, franchise, watched, label, steelbook, letterboxd, id]
            );
            return { success: true };
        }
        catch (error) {
            console.error("Error updating disc info", error);
            return fail(500, { error: "Failed to update disc information." });
        }
    },

    async delete(event) {
        const { params } = event;
        const { id } = params;
        try {
            await pool.query('DELETE FROM moviestv WHERE id = $1', [id]);
        }
        catch (error) {
            console.error("Error deleting disc", error);
            return fail(500, { error: "Failed to delete disc." });
        }
        return redirect(303, '/swmedia');
    }
};

export async function load({ params }) { 
    const { id } = params;
    try { 
        const infoResult = await pool.query('SELECT * FROM moviestv WHERE swmedia.id = $1', [id]);

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