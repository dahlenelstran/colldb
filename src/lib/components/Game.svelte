<script lang="ts">
    export let id = "Id";
    export let title = "Title";
    export let is_completed: boolean = false;
    export let systems: string[] = [];
</script>

<a class="comp-link-wrapper" href={`/games/${id}`}>
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
            </span>
        </div>
        <div class="comp-meta">
            <div>
                {#if systems.length == 1}
                    <span class="comp-info">System:</span>
                    <span>{systems[0]}</span>
                {:else}
                    <span class="comp-info">Systems:</span>
                    <span>{systems.join(', ')}</span>
                {/if}
            </div>
        </div>
    </div>
</a>