<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import Game from '$lib/components/Game.svelte';

    export let url: URL;
    let search = url?.searchParams.get('search') ?? '';

    // Define the type for system if not already defined
    type System = { system_name: string };

    let selectedFormat = url?.searchParams.get('format') ?? '';
    let selectedSystem = url?.searchParams.get('system') ?? '';
    let selectedFranchise = url?.searchParams.get('franchise') ?? '';
</script>

<div class="container">

    <h1 class="aurabesh">List of Video Games</h1>

    <form method="get" class="filters">
        <input type="text" name="search" placeholder="Search by title..." bind:value={search} />

        <select name="format" bind:value={selectedFormat}>
            <option value="">All Formats</option>
            <option value="Digital">Digital</option>
            <option value="Physical">Physical</option>
        </select>

        <select name="system" bind:value={selectedSystem}>
            <option value="">All Systems</option>
            {#each data.systemOptions as system}
                <option value={system.id}>{system.title}</option>
            {/each}
        </select>

        <select name="franchise" bind:value={selectedFranchise}>
            <option value="">All Franchises</option>
            {#each data.franchiseOptions as franchise}
                <option value={franchise}>{franchise}</option>
            {/each}
        </select>

        <button type="reset" onclick={() => { selectedFormat = ''; selectedSystem = ''; selectedFranchise = ''; }}>Reset</button>
        <button type="submit">Search</button>
    </form>

    <h4>{data.games.length} results found</h4>

    <div class="list">
        {#each data.games as x}
        <Game
            id={x.id}
            title={x.title}
            is_completed={x.is_played}
            systems={x.systems.map((s: System) => s.system_name)}
        />
        {/each}
    </div>

    <p><a class="follow-link" href="/games/create">Add a Game</a></p>
    <p><a class="follow-link" href="/games/stats">Statistics</a></p>
</div>