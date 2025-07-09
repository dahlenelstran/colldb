<script lang="ts">
    export let id = "Id";
    export let title = "Title";
    export let is_canon: boolean = false;
    export let is_owned: boolean = false;
    export let is_completed: boolean = false;
    export let run: string = "Run";
    export let issue: string = "Issue";
</script>

<a class="swmedia-link-wrapper" href={`/swmedia/${id}`}>
    <div class="swmedia">
        <div class="swmedia-header">
            <span class="swmedia-title">
                <icon class="nf nf-md-comment_text_outline" title="Comic"></icon>
                {title}
                <span class="swmedia-type"><em>Comic</em></span>
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
                <span class="swmedia-info">Run:</span>
                <span>{run}</span>
            </div>
            <div>
                <span class="swmedia-info">Issue:</span>
                <span>{issue}</span>
            </div>
        </div>
    </div>
</a>