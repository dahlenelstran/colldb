<script lang="ts">
    export let id = "Id";
    export let title = "Title";
    export let is_canon = "Is Canon";
    export let is_owned = "Is Owned";
    export let is_completed = "Is Completed";
    export let booktype = "Book Type";
    export let release_date = "Release Date";
    export let format: string[] = [];

    $: formattedDate = release_date
        ? new Date(release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : "";
</script>

<a class="comp-link-wrapper" href={`/sw_media/${id}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                <icon class="nf nf-md-book" title="Book"></icon>
                {title}
                <span class="comp-type"><em>Book</em></span>
            </span>
            <span class="comp-badges">
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
        <div class="comp-meta">
            <div>
                <span class="comp-info">Format:</span>
                <span>{format.join(', ')}</span>
                <span class="hidden">   -----             </span>
                <span class="comp-info">Type:</span>
                <span>{booktype}</span>
            </div>
            <div>
                <span class="date">{formattedDate}</span>
            </div>
        </div>
    </div>
</a>