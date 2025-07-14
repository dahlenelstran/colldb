<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import Run from '$lib/components/SWRun.svelte';
</script>

<div class="container">

    <h1 class="aurabesh">List of Star Wars Comic Runs</h1>

    <p><a class="follow_link" href="/sw_media">Back to all Star Wars Media</a></p>

    <h4> {data.runs.length} Runs Total</h4>

    <div class="list">
        {#each data.runs as x}

        <Run
            title={x.title}
            year={x.year}
            totalIssues={x.totalIssues}
            issuesOwned={x.issuesOwned}
            issuesRead={x.issuesRead}
            id={x.id}
        />

        {/each}
    </div>
</div>