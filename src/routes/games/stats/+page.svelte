<script lang="ts">
    import "$lib/assets/css/global.css";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<div class="container">
    <div class="back">
        <p><a class="follow-link" href="/games"><icon class="nf nf-fa-backward" title="Back"></icon> Back to All Games</a></p>
    </div>

    <h1 class="aurabesh">Video Game Statistics</h1>

    <h2>Overall</h2>
    <p>Total games: {Number(data.overall.total_games) + Number(data.duplicates)}</p>
    <p>Unique games: {data.overall.total_games}</p>
    <p>Played games: {data.overall.played_games}</p>
    <p>Percent played: {data.overall.percent_played}%</p>

    <h2>By System</h2>
    {#each data.systems as system}
        <div>
            <strong>{system.system_title}</strong>: {system.percent_played}% played ({system.played_games}/{system.total_games})
        </div>
    {/each}

    <h2>By Franchise</h2>
    {#each data.franchises as franchise}
        <div>
            <strong>{franchise.franchise}</strong>: {franchise.percent_played}% played ({franchise.played_games}/{franchise.total_games})
        </div>
    {/each}

    <h2>By Format</h2>
    {#each data.formats as format}
        <div>
            <strong>{format.format}</strong>: {format.percent_played}% played ({format.played_games}/{format.total_games})
        </div>
    {/each}

    <p>Number of duplicates: {data.duplicates}</p>
</div>