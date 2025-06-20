import type { PageServerLoad } from './$types';
import { pool } from "$lib/server/db";

export const load: PageServerLoad = async () => {
    try {
        const discsResult = await pool.query('SELECT * FROM moviestv');
        const discs = discsResult.rows;

        // Initialize counters
        let stats = {
            total: 0,
            Movie: 0,
            "TV Show": 0,
            VHS: 0,
            DVD: 0,
            "Blu-Ray": 0,
            "4K": 0,
            // Combinations
            VHS_TV: 0,
            DVD_TV: 0,
            BluRay_TV: 0,
            UHD_TV: 0,
            VHS_Movie: 0,
            DVD_Movie: 0,
            BluRay_Movie: 0,
            UHD_Movie: 0,
            steelbooks: 0,
            nonSteelbooks: 0,
            watched: 0,
            notWatched: 0
        };

        for (const disc of discs) {
            stats.total++;
            if (disc.type === "Movie") stats.Movie++;
            if (disc.type === "TV Show") stats["TV Show"]++;

            if (disc.resolution === "VHS") stats.VHS++;
            if (disc.resolution === "DVD") stats.DVD++;
            if (disc.resolution === "Blu-Ray") stats["Blu-Ray"]++;
            if (disc.resolution === "4K") stats["4K"]++;

            // Combinations
            if (disc.type === "TV Show" && disc.resolution === "VHS") stats.VHS_TV++;
            if (disc.type === "TV Show" && disc.resolution === "DVD") stats.DVD_TV++;
            if (disc.type === "TV Show" && disc.resolution === "Blu-Ray") stats.BluRay_TV++;
            if (disc.type === "TV Show" && disc.resolution === "4K") stats.UHD_TV++;

            if (disc.type === "Movie" && disc.resolution === "VHS") stats.VHS_Movie++;
            if (disc.type === "Movie" && disc.resolution === "DVD") stats.DVD_Movie++;
            if (disc.type === "Movie" && disc.resolution === "Blu-Ray") stats.BluRay_Movie++;
            if (disc.type === "Movie" && disc.resolution === "4K") stats.UHD_Movie++;

            // Steelbook
            if (disc.steelbook === true) stats.steelbooks++;
            if (disc.steelbook === false) stats.nonSteelbooks++;

            // Watched
            if (disc.watched === true) stats.watched++;
            if (disc.watched === false) stats.notWatched++;
        }

        return { results: stats };
    }
    catch (error) {
        console.error("Error fetching database entries", error);
        return { results: {} };
    }
};