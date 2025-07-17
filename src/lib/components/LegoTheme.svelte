<script lang="ts">
    export let title = '';
    export let id= '';
    export let set_count = 0;
    export let min_year = 0;
    export let max_year = 0;
</script>

<a class="comp-link-wrapper" href={`/lego/theme/${id}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                {title}
                <span class="comp-type"><em>{min_year} - {max_year}</em></span>
            </span>
            <span class="comp-badges">
                {#if set_count === 1}
                    {set_count} set
                {:else}
                    {set_count} sets
                {/if}
            </span>
        </div>
    </div>
</a>