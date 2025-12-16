import { pool } from "$lib/server/db";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions } from './$types';

export const actions: Actions = {
    async edit(event) {
        const { request, params } = event;
        const formData = await request.formData();
        const set_number = formData.get('set_number')?.toString() || '';
        const title = formData.get('title')?.toString() || '';
        const year = formData.get('year')?.toString() || '';
        const minifigs = formData.get('minifigs')?.toString() || '';
        const pieces = formData.get('pieces')?.toString() || '';
        const msrp = formData.get('msrp')?.toString() || '';
        const theme = formData.get('theme')?.toString() || '';
        let route = '/lego'; // Placeholder for the new disc ID, will be set after insertion

        try {
            // Insert the new disc into the database 
            await pool.query(
                'INSERT INTO lego (set_number, title, year, minifigs, pieces, msrp, theme_id, quantity, built)  VALUES ($1, $2, $3, $4, $5, $6, $7)', 
                [title, type, resolution, franchise, watched, label, steelbook, letterboxd]
            );

            // Find the new disc's ID so we can redirect to its page
            const result = await pool.query('SELECT id FROM moviestv WHERE title = $1 AND type = $2 AND resolution = $3 AND franchise = $4 AND watched = $5 AND label = $6 AND steelbook = $7 AND letterboxd = $8 ORDER BY id DESC LIMIT 1',
                [title, type, resolution, franchise, watched, label, steelbook, letterboxd]
            );
            const newID = result.rows[0].id;
            route = '/movies_and_tv/' + newID;
        }
        catch (error) {
            console.error("Error adding disc", error);
            return fail(500, { error: "Failed to adding disc information." });
        }
        return redirect(303, route);
    }
};