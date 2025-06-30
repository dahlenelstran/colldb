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
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    table {
        margin-bottom: 20px; /* Add some space between tables */
        border-collapse: collapse; /* Collapse borders so they don't double up */
        width: 100%; /* Set table width to 100% */
    }

    th, td {
        border: 1px solid #ddd; /* Add border to table cells */
        padding: 8px; /* Add padding to table cells */
        text-align: left; /* Align text to the left within cells */
    }

    th {
        background-color: #f2f2f2; /* Add background color to table header cells */
    }

    .follow_link {
      color: rgb(218, 32, 193);
      text-decoration: none;
      border: none;
      padding: 0;
    }

    p {
      text-align: left;
      font-size: 1rem;
      margin-top: 0; /* Adjusted margin-top */
      height: auto; /* Fixed height */
      display: block;
      padding-bottom: 0;
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
            <label for="type">Resolution:</label>
            <select name="type" id="type" bind:value={selectedRes}>
                <option value="">All</option>
                {#each data.res ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="type">Franchise:</label>
            <select name="type" id="type" bind:value={selectedFranchise}>
                <option value="">All</option>
                {#each data.franchises ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="type">Watched:</label>
            <select name="type" id="type" bind:value={selectedWatched}>
                <option value="">All</option>
                {#each data.watchedOptions ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="type">Label:</label>
            <select name="type" id="type" bind:value={selectedLabel}>
                <option value="">All</option>
                {#each data.labels ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            <label for="type">Steelbook:</label>
            <select name="type" id="type" bind:value={selectedSteel}>
                <option value="">All</option>
                {#each data.steelbooks ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
        </div>
        <button type="submit">Filter</button>
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