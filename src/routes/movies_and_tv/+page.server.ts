import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async ({ url }) => {
    let discs: any[] = [];
    let results: any[] = [];
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

        if (conditions.length > 0) {
            query += ' WHERE ' + conditions.join(' AND ');
        }

        const discsResult = await pool.query(query, values);

        function stripThe(title: string): string {
            return title.replace(/^the\s+/i, '').trim();
        }
        discs = discsResult.rows;
        discs.sort((a, b) => stripThe(a.title).localeCompare(stripThe(b.title)));

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
            res: [],
            franchises: [],
            watchedOptions: [],
            labels: [],
            steelbooks: []
        };
    }
}