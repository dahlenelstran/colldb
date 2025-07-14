<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
    import Issue from "$lib/components/SWRunIssue.svelte";

    // Count read and owned issues
    $: readCount = data.issues.filter(issue => issue.is_completed).length;
    $: percentRead = (readCount / data.issues.length) * 100;
    $: ownedCount = data.issues.filter(issue => issue.is_owned).length;
    $: percentOwned = (ownedCount / data.issues.length) * 100;
</script>

<div class="container">
    <p><a class="follow_link" href="/sw_media">Back to all Star Wars Media</a></p>
    <p><a class="follow_link" href={`/sw_media/runs/`}>Back to Star Wars Comic Runs</a></p>

    <h1>{data.run.title} {#if data.run.year}({data.run.year}){/if}</h1>

    <h4> {data.issues.length} Issues Total</h4>
    <h4> {readCount} Issues Read ({percentRead.toFixed(0)}%) / {ownedCount} Issues Owned ({percentOwned.toFixed(0)}%)</h4>


    <div class="list">
        {#each data.issues as issue}

        <Issue
            title={issue.title}
            is_owned={issue.is_owned}
            is_completed={issue.is_completed}
            release_date={issue.release_date}
            id={issue.id}
        />
        {/each}
    </div>
</div>