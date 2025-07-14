<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import LegoSet from '$lib/components/LegoSet.svelte';

    export let url: URL;
    let selectedYear = url?.searchParams.get('year') ?? '';
    let selectedTheme = url?.searchParams.get('theme') ?? '';
    let selectedLicense = url?.searchParams.get('license') ?? '';
    let search = url?.searchParams.get('search') ?? '';
</script>

<div class="container">

    <h1 class="aurabesh">List of Lego Sets</h1>

    <form method="get" class="filters">
        <input type="text" name="search" placeholder="Search by Set Title..." bind:value={search} />

        <select name="year" bind:value={selectedYear}>
            <option value="">All Years</option>
            {#each data.yearOptions as year}
                <option value={year}>{year}</option>
            {/each}
        </select>

        <select name="theme" bind:value={selectedTheme}>
            <option value="">All Themes</option>
            {#each data.themeOptions as theme}
                <option value={theme.id}>{theme.title}</option>
            {/each}
        </select>

        <select name="license" bind:value={selectedLicense}>
            <option value="">All</option>
            <option value="true">Licensed</option>
            <option value="false">Non-Licensed</option>
        </select>

        <button type="reset" on:click={() => { selectedYear = ''; selectedTheme = ''; selectedLicense = ''; }}>Reset</button>
        <button type="submit">Search</button>
    </form>

    <h4>{data.sets.length} results found</h4>
    
    <div class="list">
        {#each data.sets as x}
        <LegoSet
            set_number = {x.set_number}
            title = {x.title}
            theme = {x.theme_title}
            year = {x.year}
            minifigs = {x.minifigs}
            pieces = {x.pieces}
            msrp = {x.msrp}
        />
        {/each}
    </div>

    <p><a class="follow_link" href="/lego/create">Add a Lego Set</a></p>
    <p><a class="follow_link" href="/lego/stats">Statistics</a></p>
</div>