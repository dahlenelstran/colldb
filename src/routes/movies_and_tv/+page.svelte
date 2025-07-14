<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import Disc from '$lib/components/Disc.svelte';
    
    // Filters

    export let url: URL;
    let selectedType = url?.searchParams.get('type') ?? '';
    let selectedRes = url?.searchParams.get('resolution') ?? '';
    let selectedFranchise = url?.searchParams.get('franchise') ?? '';
    let selectedWatched = url?.searchParams.get('watched') ?? '';
    let selectedLabel = url?.searchParams.get('label') ?? '';
    let selectedSteel = url?.searchParams.get('steelbook') ?? '';
    let search = url?.searchParams.get('search') ?? '';
    let selectRandom = url?.searchParams.has('random');
</script>

<div class="container">

    <h1 class="aurabesh">List of Movies and TV Shows</h1>

    <form method="get" class="filters">
        <div>
            <label for="type">Type:</label>
            <select name="type" id="type" bind:value={selectedType}>
                <option value="">All</option>
                {#each data.types ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="resolution">Resolution:</label>
            <select name="resolution" id="resolution" bind:value={selectedRes}>
                <option value="">All</option>
                {#each data.resolutions ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="franchise">Franchise:</label>
            <select name="franchise" id="franchise" bind:value={selectedFranchise}>
                <option value="">All</option>
                {#each data.franchises ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="watched">Watched:</label>
            <select name="watched" id="watched" bind:value={selectedWatched}>
                <option value="">All</option>
                {#each data.watchedOptions ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="label">Label:</label>
            <select name="label" id="label" bind:value={selectedLabel}>
                <option value="">All</option>
                {#each data.labels ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="steelbook">Steelbook:</label>
            <select name="steelbook" id="steelbook" bind:value={selectedSteel}>
                <option value="">All</option>
                {#each data.steelbooks ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
        </div>
        <input type="checkbox" name="random" bind:checked={selectRandom} />Pick Random
        <input type="text" name="search" placeholder="Search by title..." bind:value={search} />
        <button type="submit">Search</button>
        <button type="reset" onclick={() => { selectedType = ''; }}>Reset</button>
    </form>

    <h4> {data.discs.length} results found</h4>

    <div class="list">
        {#each data.discs as x}

        <Disc
            title={x.title}
            resolution={x.resolution}
            id={x.id}
            watched={x.watched}
            type={x.type}
        />
        {/each}
    </div>
    
    

    <!-- <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Resolution</th>
            </tr>
        </thead>
        <tbody>
            {#each data.discs as x}
                <tr>
                    <td><p><a class="follow_link" href="/movies_and_tv/{x.id}">{x.title}</a></p></td>
                    <td>{x.resolution}</td>
                </tr>
            {/each}
        </tbody>
    </table> -->

    <p><a class="follow_link" href="/movies_and_tv/create">Add a Movie or TV Show</a></p>

    <p><a class="follow_link" href="/movies_and_tv/stats">Statistics</a></p>
</div>