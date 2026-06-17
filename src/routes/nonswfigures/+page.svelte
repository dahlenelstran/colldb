<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import NonSWFig from "$lib/components/NonSWFig.svelte";
    import Grid from "$lib/components/Grid.svelte";
</script>

<div class="container">

    <h1 class="aurabesh">List of Non Star Wars Action Figures</h1>

    <h4>{data.figs.length} total figures </h4>

    <Grid>
        {#each data.figs as x}
        <NonSWFig
            id = {x.id}
            name = {x.name}
            franchise = {x.franchise}
            line = {x.line}
            tags = {x.tags}
            image = {x.image}
        />
        {/each}
    </Grid>
</div>