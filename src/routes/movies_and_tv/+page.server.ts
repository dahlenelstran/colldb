import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    let discs: any[] = [];
    try {

        // Pulling filter options

        const allResult = await pool.query('SELECT DISTINCT type, resolution, franchise, watched, label, steelbook FROM moviestv');

        const types = [...new Set(allResult.rows.map(r => r.type).filter(Boolean))];
        const resolutions = [...new Set(allResult.rows.map(r => r.resolution).filter(Boolean))];
        const franchises = [...new Set(allResult.rows.map(r => r.franchise).filter(Boolean))];
        const watchedOptions = [...new Set(allResult.rows.map(r => r.watched).filter(v => v !== null))];
        const labels = [...new Set(allResult.rows.map(r => r.label).filter(Boolean))];
        const steelbooks = [...new Set(allResult.rows.map(r => r.steelbook).filter(v => v !== null))];

        
        // Pulling filtered results

        const type = url.searchParams.get('type');
        const resolution = url.searchParams.get('resolution');
        const franchise = url.searchParams.get('franchise');
        const watched = url.searchParams.get('watched');
        const label = url.searchParams.get('label');
        const steelbook = url.searchParams.get('steelbook');
        const search = url.searchParams.get('search');
        const random = url.searchParams.get('random');

        let query = 'SELECT * FROM moviestv';
        let conditions: string[] = [];
        let values: any[] = [];

        if (type) {
            conditions.push('type = $' + (values.length + 1));
            values.push(type);
        }
        if (resolution) {
            conditions.push('resolution = $' + (values.length + 1));
            values.push(resolution);
        }
        if (franchise) {
            conditions.push('franchise = $' + (values.length + 1));
            values.push(franchise);
        }
        if (watched) {
            conditions.push('watched = $' + (values.length + 1));
            values.push(watched === "true" ? true : watched === "false" ? false : watched);
        }
        if (label) {
            conditions.push('label = $' + (values.length + 1));
            values.push(label);
        }
        if (steelbook) {
            conditions.push('steelbook = $' + (values.length + 1));
            values.push(steelbook === "true" ? true : steelbook === "false" ? false : steelbook);
        }
        if (search) {
            conditions.push('LOWER(title) LIKE $' + (values.length + 1));
            values.push(`%${search.toLowerCase()}%`);
        }

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const discsResult = await pool.query(query, values);

        // Sorting results, ignoring "The" at the start of titles

        function stripThe(title: string): string {
            return title.replace(/^the\s+/i, '').trim();
        }
        discs = discsResult.rows;
        discs.sort((a, b) => stripThe(a.title).localeCompare(stripThe(b.title)));

        if (random && discs.length > 0) {
            const randomIndex = Math.floor(Math.random() * discs.length);
            discs = [discs[randomIndex]];
        }

        return { 
            discs,
            types,
            resolutions,
            franchises,
            watchedOptions,
            labels,
            steelbooks
        };
    }
    catch (error) {
        console.error("Error fetching database entries", error);
        return {
            discs: [],
            types: [],
            resolutions: [],
            franchises: [],
            watchedOptions: [],
            labels: [],
            steelbooks: []
        };
    }
}