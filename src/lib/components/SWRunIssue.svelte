<script lang="ts">
    import { formatDate } from '$lib/utils/formatDate';
    export let id = "Id";
    export let title = "Title";
    export let is_owned: boolean = false;
    export let is_completed: boolean = false;
    export let release_date: string = "";

     $: formattedDate = release_date
        ? new Date(release_date).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })
        : "";
</script>

<a class="swmedia-link-wrapper" href={`/sw_media/${id}`}>
    <div class="swmedia">
        <div class="swmedia-header">
            <span class="swmedia-title">
                {title}
            </span>
            <span class="swmedia-badges">
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
                <span class="swmedia-info">Release Date:</span>
                <span>
                    {#if release_date && formatDate(release_date)}
                        {formatDate(release_date)}
                    {:else if formattedDate}
                        {formattedDate}
                    {:else}
                        {release_date ? release_date : "Unknown"}
                    {/if}
                </span>
            </div>
        </div>
    </div>
</a>