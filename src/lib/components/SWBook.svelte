<script lang="ts">
    export let id = "Id";
    export let title = "Title";
    export let is_canon: boolean = false;
    export let is_owned: boolean = false;
    export let is_completed: boolean = false;
    export let booktype = "Book Type";
    export let format: string[] = [];
</script>

<a class="swmedia-link-wrapper" href={`/swmedia/${id}`}>
    <div class="swmedia">
        <div class="swmedia-header">
            <span class="swmedia-title">
                <icon class="nf nf-md-book" title="Book"></icon>
                {title}
                <span class="swmedia-type"><em>Book</em></span>
            </span>
            <span class="swmedia-badges">
                {#if is_canon === true || is_canon === "true"}
                    <i class="nf nf-md-star yes-icon" title="Canon"></i>
                {:else}
                    <i class="nf nf-md-star no-icon" title="Not Canon"></i>
                {/if}
                {#if is_completed === true || is_completed === "true"}
                    <i class="nf nf-md-checkbox_marked_circle_outline yes-icon" title="Completed"></i>
                {:else}
                    <i class="nf nf-md-checkbox_blank_circle_outline no-icon" title="Not Completed"></i>
                {/if}
                {#if is_owned === true || is_owned === "true"}
                    <i class="nf nf-md-close_box yes-icon" title="Owned"></i>
                {:else}
                    <i class="nf nf-md-texture_box no-icon" title="Not Owned"></i>
                {/if}
            </span>
        </div>
        <div class="swmedia-meta">
            <div>
                <span class="swmedia-info">Format:</span>
                <span>{format.join(', ')}</span>
            </div>
            <div>
                <span class="swmedia-info">Type:</span>
                <span>{booktype}</span>
            </div>
        </div>
    </div>
</a>