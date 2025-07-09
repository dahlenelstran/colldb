<script lang="ts">
    export let id = "Id";
    export let title = "Title";
    export let is_canon = "Is Canon";
    export let is_owned = "Is Owned";
    export let is_completed = "Is Completed";
    export let show = "Show";
</script>

<a class="swmedia-link-wrapper" href={`/sw_media/${id}`}>
    <div class="swmedia">
        <div class="swmedia-header">
            <span class="swmedia-title">
                <icon class="nf nf-md-television_box" title="Season"></icon>
                {title}
                <span class="swmedia-type"><em>TV Season</em></span>
            </span>
            <span class="swmedia-badges">
                {#if is_canon}
                    <i class="nf nf-md-star yes-icon" title="Canon"></i>
                {:else}
                    <i class="nf nf-md-star no-icon" title="Not Canon"></i>
                {/if}
                {#if is_completed}
                    <i class="nf nf-md-checkbox_marked_circle_outline yes-icon" title="Completed"></i>
                {:else}
                    <i class="nf nf-md-checkbox_blank_circle_outline no-icon" title="Not Completed"></i>
                {/if}
                {#if is_owned}
                    <i class="nf nf-md-close_box yes-icon" title="Owned"></i>
                {:else}
                    <i class="nf nf-md-texture_box no-icon" title="Not Owned"></i>
                {/if}
            </span>
        </div>
        <div class="swmedia-meta">
            <div>
                <span class="swmedia-info">Show:</span>
                <span>{show}</span>
            </div>
        </div>
    </div>
</a>