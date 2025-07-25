<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    import { goto } from '$app/navigation';
    export let data: PageData;
    import FilterBar from '$lib/components/FilterBar.svelte';
    import SWGame from '$lib/components/SWGame.svelte';
    import SWSeason from '$lib/components/SWSeason.svelte';
    import SWComic from '$lib/components/SWComic.svelte';
    import SWBook from '$lib/components/SWBook.svelte';

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
    let selectedShow = url?.searchParams.get('show') ?? '';
    let selectedTitle = '';
    let selectedRunTitle = '';
    let selectedRunYear = '';

    $: {
        if (selectedTitle) {
            const [title, year] = selectedTitle.split('|||');
            selectedRunTitle = title;
            selectedRunYear = year;
        } else {
            selectedRunTitle = '';
            selectedRunYear = '';
        }
    }

</script>

<div class="container">

    <h1 class="aurabesh">Star Wars Media</h1>

    <FilterBar
        onSubmit={() => {
        const params = new URLSearchParams({
            type: selectedType,
            canon: selectedCanon,
            owned: selectedOwned,
            completed: selectedCompleted,
            system: selectedSystem,
            format: selectedFormat,
            bookType: selectedBookType,
            runTitle: selectedRunTitle,
            runYear: selectedRunYear,
            search
        });
        goto(`?${params.toString()}`);
    }}
        onReset={() => {
            selectedType = '';
            selectedCanon = '';
            selectedOwned = '';
            selectedCompleted = '';
            selectedSystem = '';
            selectedFormat = '';
            selectedBookType = '';
            search = '';
            selectedRunTitle = '';
            selectedRunYear = '';
        }}
    >
        <span slot="dropdowns">
            <div class="filterbar-group">
                <label for="type">Type:</label>
                <select id="type" bind:value={selectedType}>
                    <option value="">All</option>
                    {#each data.types ?? [] as t}
                        <option value={t}>{t}</option>
                    {/each}
                </select>
            </div>
            <div class="filterbar-group">
                <label for="canon">Canon:</label>
                <select id="canon" bind:value={selectedCanon}>
                    <option value="">All</option>
                    {#each data.is_canons ?? [] as t}
                        <option value={t === true ? "true" : t === false ? "false" : t}>
                            {t === true ? "True" : t === false ? "False" : t}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="filterbar-group">
                <label for="owned">Owned:</label>
                <select id="owned" bind:value={selectedOwned}>
                    <option value="">All</option>
                    {#each data.is_owneds ?? [] as t}
                        <option value={t === true ? "true" : t === false ? "false" : t}>
                            {t === true ? "True" : t === false ? "False" : t}
                        </option>
                    {/each}
                </select>
            </div>
            <div class="filterbar-group">
                <label for="completed">Completed:</label>
                <select id="completed" bind:value={selectedCompleted}>
                    <option value="">All</option>
                    {#each data.is_completeds ?? [] as t}
                        <option value={t === true ? "true" : t === false ? "false" : t}>
                            {t === true ? "True" : t === false ? "False" : t}
                        </option>
                    {/each}
                </select>
            </div>

            {#if selectedType === 'game'}
                <div class="filterbar-group">
                    <label for="system">System:</label>
                    <select id="system" bind:value={selectedSystem}>
                        <option value="">All</option>
                        {#each data.systems ?? [] as t}
                            <option value={t}>{t}</option>
                        {/each}
                    </select>
                </div>
            {:else if selectedType === 'book'}
                <div class="filterbar-group">
                    <label for="format">Format:</label>
                    <select id="format" bind:value={selectedFormat}>
                        <option value="">All</option>
                        {#each data.formats ?? [] as t}
                            <option value={t}>{t}</option>
                        {/each}
                    </select>
                </div>
                <div class="filterbar-group">
                    <label for="bookType">Book Type:</label>
                    <select id="bookType" bind:value={selectedBookType}>
                        <option value="">All</option>
                        {#each data.bookTypes ?? [] as t}
                            <option value={t}>{t}</option>
                        {/each}
                    </select>
                </div>
            {:else if selectedType === 'tvseason'}
                <div class="filterbar-group">
                    <label for="show">Show:</label>
                    <select id="show" bind:value={selectedShow}>
                        <option value="">All</option>
                        {#each data.shows ?? [] as t}
                            <option value={t}>{t}</option>
                        {/each}
                    </select>
                </div>
            {:else if selectedType === 'comic'}
                <div class="filterbar-group">
                    <label for="title">Title:</label>
                    <select id="title" bind:value={selectedTitle}>
                        <option value="">All</option>
                        {#each data.comicRuns as run}
                            <option value={`${run.title}|||${run.year}`}>
                                {run.title} {run.year ? `(${run.year})` : ''}
                            </option>
                        {/each}
                    </select>
                </div>
            {/if}
        </span>
        <span slot="search">
            <input type="text" placeholder="Search by title..." bind:value={search} />
        </span>
    </FilterBar>

    <div class="info">
        <span><a class="follow-link" href="/sw_media/runs">Comic Runs <icon class="nf nf-fa-forward" title="Edit"></icon></a></span>
        <span><a class="follow-link" href="/sw_media/shows">Shows <icon class="nf nf-fa-forward" title="Edit"></icon></a></span>
    </div>
    
    <h4> {data.media.length} results found</h4>

    <div class="list">
        {#each data.media as x}

        {#if x.type === 'game'}
            <SWGame
                id={x.id}
                title={x.title}
                is_canon={x.is_canon}
                is_owned={x.is_owned}
                is_completed={x.is_completed}
                systems={x.systems}
            />
        {:else if x.type === 'tvseason'}
            <SWSeason
                id={x.id}
                title={x.title}
                is_canon={x.is_canon}
                is_owned={x.is_owned}
                is_completed={x.is_completed}
                show={x.show}
            />
        {:else if x.type === 'comic'}
            <SWComic
                id={x.id}
                title={x.title}
                run={`${x.run}${x.run_year ? ` (${x.run_year})` : ''}`}
                issue={x.issue}
                is_canon={x.is_canon}
                is_owned={x.is_owned}
                is_completed={x.is_completed}
            />
        {:else if x.type === 'book'}
            <SWBook
                id={x.id}
                title={x.title}
                format={x.formats}
                booktype={x.booktype}
                is_canon={x.is_canon}
                is_owned={x.is_owned}
                is_completed={x.is_completed}
            />
        {/if}

        {/each}
    </div>

</div>