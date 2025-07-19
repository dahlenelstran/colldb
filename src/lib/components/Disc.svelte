<script lang="ts">
    export let title = "Title";
    export let resolution = "Resolution";
    export let id = "Id";
    export let watched: boolean = false;
    export let type: string = "Type";
    export let label: string = "";
    export let steelbook: boolean = false;
</script>

<a class="comp-link-wrapper" href={`/movies_and_tv/${id}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                {#if type === "Movie"}
                    <i class="nf nf-md-movie_roll comp-icon"></i>{title}
                {:else}
                    <i class="nf nf-md-television_classic comp-icon"></i>{title}
                {/if}
                <span class="comp-type"><em>{resolution}</em></span>
            </span>
            <span class="comp-badges">
                {#if watched}
                    <i class="nf nf-md-checkbox_marked_circle_outline yes-icon" title="Completed"></i>
                {:else}
                    <i class="nf nf-md-checkbox_blank_circle_outline no-icon" title="Not Completed"></i>
                {/if}
            </span>
        </div>
        {#if label || steelbook}
        <div class="comp-meta">
            {#if label && steelbook}
                <span class="comp-info">{label} Steelbook</span>
            {:else}
                <span class="comp-info">{label}{steelbook ? ' Steelbook' : ''}</span>
            {/if}
        </div>
        {/if}
    </div>
</a>