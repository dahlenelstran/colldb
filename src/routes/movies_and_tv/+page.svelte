<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
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

<style>
    :global(body) {
        background-color: #222; /* dark gray */
        color: #f0f0f0;         /* light text for contrast */
        margin: 0;
        font-family: 'Segoe UI', Arial, sans-serif;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-height: 100vh;
        padding: 2rem 0;
    }

    table {
        margin-bottom: 20px;
        border-collapse: collapse;
        width: 100%;
        background-color: #2c2c2c; /* slightly lighter dark for table */
        color: #f0f0f0;
    }

    th, td {
        border: 1px solid #444;
        padding: 8px;
        text-align: left;
    }

    th {
        background-color: #333;
    }

    .follow_link {
        color: #ff69b4; /* hot pink for accent */
        text-decoration: none;
        border: none;
        padding: 0;
    }

    .follow_link:hover {
        text-decoration: underline;
    }

    p {
        text-align: left;
        font-size: 1rem;
        margin-top: 0;
        height: auto;
        display: block;
        padding-bottom: 0;
    }

    input, select, button {
        background: #333;
        color: #f0f0f0;
        border: 1px solid #555;
        border-radius: 4px;
        margin: 0 0.25rem 0.5rem 0;
        padding: 0.5rem;
    }

    input[type="checkbox"] {
        accent-color: #ff69b4;
    }

    button {
        cursor: pointer;
        background: #444;
        transition: background 0.2s;
    }

    button:hover {
        background: #555;
    }
</style>

<div class="container">

    <h1>List of Movies and TV Shows</h1>

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

    <table>
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
    </table>

    <p><a class="follow_link" href="/movies_and_tv/create">Add a Movie or TV Show</a></p>

    <p><a class="follow_link" href="/movies_and_tv/stats">Statistics</a></p>
</div>