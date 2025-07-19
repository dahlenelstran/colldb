<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import LegoTheme from '$lib/components/LegoTheme.svelte';

    let sortBy: 'alpha' | 'count' = 'alpha';

    $: sortedThemes = [...data.themes].sort((a, b) => {
        if (sortBy === 'alpha') {
            return a.theme_title.localeCompare(b.theme_title);
        } else if (sortBy === 'count') {
            return b.set_count - a.set_count;
        }
        return 0;
    });
</script>

<div class="list">
    <div class="back">
        <p><a class="follow-link" href="/lego"><icon class="nf nf-fa-backward" title="Back"></icon> Back to All Themes</a></p>
    </div>

    <h1>Lego Themes</h1>

    <h4>{data.themes.length} themes total</h4>

    <label>
        Sort by:
        <select bind:value={sortBy}>
            <option value="alpha">Alphabetical</option>
            <option value="count">Number of Sets</option>
        </select>
    </label>

    {#each sortedThemes as theme}
        <LegoTheme
            title={theme.theme_title}
            id={theme.theme_id}
            set_count={theme.set_count}
            min_year={theme.min_year}
            max_year={theme.max_year}
        />
    {/each}
</div>