<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import SWFig from "$lib/components/SWFig.svelte";
    import Grid from "$lib/components/Grid.svelte";
</script>

<div class="container">

    <h1 class="aurabesh">List of Star Wars Action Figures</h1>

    <h4>{data.figs.length} total figures / {data.figs.filter(f => f.owned).length} owned ({data.figs.filter(f => f.owned).length / data.figs.length * 100}%)</h4>

    <Grid>
        {#each data.figs as x}
        <SWFig
            id = {x.id}
            name = {x.name}
            media_source = {x.media_source}
            owned = {x.owned}
            line_title = {x.line_title}
            scale = {x.scale}
        />
        {/each}
    </Grid>
</div>