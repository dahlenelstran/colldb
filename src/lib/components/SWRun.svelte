<script lang="ts">
    export let title = "Title";
    export let totalIssues = 0;
    export let issuesOwned = 0;
    export let issuesRead = 0;
    export let id = "Id";
    export let year = "";
</script>

<a class="comp-link-wrapper" href={`/sw_media/runs/${id}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                {title} {#if year}({year}){/if}
                <span class="comp-type"><em>{totalIssues} Issues</em></span>
            </span>
            <span class="comp-badges">
                {#if issuesRead === totalIssues}
                    <i class="nf nf-md-checkbox_marked_circle_outline yes-icon" title="Completed"></i>
                {:else}
                    <i class="nf nf-md-checkbox_blank_circle_outline no-icon" title="Not Completed"></i>
                {/if}
                {#if issuesOwned === totalIssues}
                    <i class="nf nf-md-close_box yes-icon" title="Owned"></i>
                {:else}
                    <i class="nf nf-md-texture_box no-icon" title="Not Owned"></i>
                {/if}
            </span>
        </div>
        <div class="comp-meta">
            <div>
                <span class="comp-info">Owned:</span>
                <span>{issuesOwned} / {totalIssues} ({Math.round((issuesOwned / totalIssues) * 100)}%)</span>
            </div>
            <div>
                <span class="comp-info">Read:</span>
                <span>{issuesRead} / {totalIssues} ({Math.round((issuesRead / totalIssues) * 100)}%)</span>
            </div>
        </div>
    </div>
</a>