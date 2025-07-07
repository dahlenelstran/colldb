import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    let media: any[] = [];
    try {
        
        // Pulling filter options

        const allResult = await pool.query('SELECT DISTINCT type, is_canon, is_owned, is_completed FROM swmedia');

        const types = [...new Set(allResult.rows.map(r => r.type).filter(Boolean))];
        const is_canons = [...new Set(allResult.rows.map(r => r.is_canon).filter(v => v !== null))];
        const is_owneds = [...new Set(allResult.rows.map(r => r.is_owned).filter(v => v !== null))];
        const is_completeds = [...new Set(allResult.rows.map(r => r.is_completed).filter(v => v !== null))];

        // Pulling filtered results

        const type = url.searchParams.get('type');
        const is_canon = url.searchParams.get('canon');
        const is_owned = url.searchParams.get('owned');
        const is_completed = url.searchParams.get('completed');
        const search = url.searchParams.get('search');

        let query = 'SELECT * FROM swmedia';
        let conditions: string[] = [];
        let values: any[] = [];

        if (type) {
            conditions.push('type = $' + (values.length + 1));
            values.push(type);
        }
        if (is_canon) {
            conditions.push('is_canon = $' + (values.length + 1));
            values.push(is_canon === "true" ? true : is_canon === "false" ? false : is_canon);
        }
        if (is_owned) {
            conditions.push('is_owned = $' + (values.length + 1));
            values.push(is_owned === "true" ? true : is_owned === "false" ? false : is_owned);
        }
        if (is_completed) {
            conditions.push('is_completed = $' + (values.length + 1));
            values.push(is_completed === "true" ? true : is_completed === "false" ? false : is_completed);
        }
        if (search) {
            conditions.push('LOWER(title) LIKE $' + (values.length + 1));
            values.push(`%${search.toLowerCase()}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        query += ' ORDER BY release_date DESC';

        const mediaResult = await pool.query(query, values);
        media = mediaResult.rows;


        return { 
            media,
            types,
            is_canons,
            is_owneds,
            is_completeds
        };
    }
    catch (error) {
        console.error('Error fetching Star Wars media:', error);
        return { 
            media: [],
            types: [],
            is_canons: [],
            is_owneds: [],
            is_completeds: [],
            error: 'Failed to load Star Wars media.'
        };
    }
}