<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;

    // Filters

    export let url: URL;
    let selectedType = url?.searchParams.get('type') ?? '';
    let selectedCanon = url?.searchParams.get('canon') ?? '';
    let selectedOwned = url?.searchParams.get('owned') ?? '';
    let selectedCompleted = url?.searchParams.get('completed') ?? '';
    let search = url?.searchParams.get('search') ?? '';
    let selectedSystem = url?.searchParams.get('system') ?? '';
    let selectedFormat = url?.searchParams.get('format') ?? '';
    let selectedBookType = url?.searchParams.get('bookType') ?? '';
    let selectedRun = url?.searchParams.get('run') ?? '';
    let selectedIssue = url?.searchParams.get('issue') ?? '';

</script>

<div class="container">

    <h1 class="aurabesh">List of Star Wars Media</h1>

    <form method="get" class="filters">
        <div>
            <label for="type">Type:</label>
            <select name="type" id="type" bind:value={selectedType}>
                <option value="">All</option>
                {#each data.types ?? [] as t}
                <option value={t}>{t}</option>
                {/each}
            </select>
            {#if selectedType === 'game'}
                <label for="system">System:</label>
                <select name="system" id="system" bind:value={selectedSystem}>
                    <option value="">All</option>
                    {#each data.systems ?? [] as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
            {:else if selectedType === 'book'}
                <label for="format">Format:</label>
                <select name="format" id="format" bind:value={selectedFormat}>   
                    <option value="">All</option>
                    {#each data.formats ?? [] as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
                <label for="bookType">Book Type:</label>
                <select name="bookType" id="bookType" bind:value={selectedBookType}>
                    <option value="">All</option>
                    {#each data.bookTypes ?? [] as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
            {:else if selectedType === 'comic'}
                <label for="run">Run:</label>
                <select name="run" id="run" bind:value={selectedRun}>
                    <option value="">All</option>
                    {#each data.runs ?? [] as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
                <label for="issue">Issue:</label>
                <select name="issue" id="issue" bind:value={selectedIssue}>
                    <option value="">All</option>
                    {#each data.issues ?? [] as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
            {/if}
            <label for="canon">Canon:</label>
            <select name="canon" id="canon" bind:value={selectedCanon}>
                <option value="">All</option>
                {#each data.is_canons ?? [] as t}
                    <option value={t === true ? "true" : t === false ? "false" : t}>
                        {t === true ? "True" : t === false ? "False" : t}
                    </option>
                {/each}
            </select>

            <label for="owned">Owned:</label>
            <select name="owned" id="owned" bind:value={selectedOwned}>
                <option value="">All</option>
                {#each data.is_owneds ?? [] as t}
                    <option value={t === true ? "true" : t === false ? "false" : t}>
                        {t === true ? "True" : t === false ? "False" : t}
                    </option>
                {/each}
            </select>

            <label for="completed">Completed:</label>
            <select name="completed" id="completed" bind:value={selectedCompleted}>
                <option value="">All</option>
                {#each data.is_completeds ?? [] as t}
                    <option value={t === true ? "true" : t === false ? "false" : t}>
                        {t === true ? "True" : t === false ? "False" : t}
                    </option>
                {/each}
            </select>
        </div>
        <input type="text" name="search" placeholder="Search by title..." bind:value={search} />
        <button type="submit">Search</button>
        <button type="reset" onclick={() => { selectedType = ''; }}>Reset</button>
    </form>

    <h4> {data.media.length} results found</h4>

    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Owned</th>
                <th>Completed</th>
            </tr>
        </thead>
        <tbody>
            {#each data.media as x}
                <tr>
                    <td>{x.title}</td>
                    <td>
                        {#if x.is_owned}
                            <i class="nf nf-md-check_circle_outline yes-icon"></i>
                        {:else}
                            <i class="nf nf-md-checkbox_blank_circle_outline no-icon"></i>
                        {/if}
                    </td>
                    <td>
                        {#if x.is_completed}
                            <i class="nf nf-md-check_circle_outline yes-icon"></i>
                        {:else}
                            <i class="nf nf-md-checkbox_blank_circle_outline no-icon"></i>
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>