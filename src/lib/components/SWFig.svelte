<script lang="ts">
    export let id = "Id";
    export let name = "Name";
    export let owned: boolean = false;
    export let media_source: string = "Media Source";
    export let line_title: string = "Line Title";
    export let scale: number = 3.75;
</script>

<a class="comp-link-wrapper" href={`/figures/${id}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                {name}
                <span class="comp-type"><em>{line_title}</em></span>
            </span>
            <span class="comp-badges">
                {#if owned}
                    <i class="nf nf-md-close_box yes-icon" title="Owned"></i>
                {:else}
                    <i class="nf nf-md-texture_box no-icon" title="Not Owned"></i>
                {/if}
            </span>
        </div>
        <div class="comp-meta">
            <div>
                <span>{media_source}</span>
            </div>
            <div>
                <span class="date">{scale}" inch Scale</span>
            </div>
        </div>
    </div>
</a>