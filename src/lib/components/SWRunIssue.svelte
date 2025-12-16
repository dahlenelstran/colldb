<script lang="ts">
    // Figure out how to formatDate without the way it's done now
    import { formatDate } from '$lib/utils/formatDate';
    export let id = "Id";
    export let title = "Title";
    export let is_owned: boolean = false;
    export let is_completed: boolean = false;
    export let release_date: string = "";

    $: formattedDate = release_date
        ? new Date(release_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : "";
</script>

<a class="comp-link-wrapper" href={`/sw_media/${id}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                {title}
            </span>
            <span class="comp-badges">
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
                <span class="comp-info">Release Date:</span>
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