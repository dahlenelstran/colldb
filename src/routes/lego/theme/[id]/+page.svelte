<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    import LegoSet from '$lib/components/LegoSet.svelte';
    export let data: PageData;
</script>

<div class="container">
    <div class="back">
        <p><a class="follow-link" href="/lego/theme"><icon class="nf nf-fa-backward" title="Back"></icon> Back to Theme List</a></p>
    </div>

    <h1>{data.theme.title}</h1>

    <p><a class="follow-link" href="/lego/theme_[{data.theme.id}]/stats">Statistics</a></p>

    <h4>{data.sets.length} Sets Owned</h4>

    <div class="list">
        {#each data.sets as x}
        <LegoSet
            set_number = {x.set_number}
            title = {x.title}
            year = {x.year}
            minifigs = {x.minifigs}
            pieces = {x.pieces}
        />
        {/each}
    </div>
</div>