<script lang="ts">
    export let set_number= "Id";
    export let title = "Title";
    export let year = "Year";
    export let minifigs = "Minifigs";
    export let pieces = "Pieces";
    export let theme: string | undefined = undefined; // Optional theme property
</script>

<a class="comp-link-wrapper" href={`/lego/${set_number}`}>
    <div class="comp">
        <div class="comp-header">
            <span class="comp-title">
                {set_number} / {title}
                <span class="comp-type"><em>{year}</em></span>
            </span>
            {#if theme}
                <span class="comp-badges">
                    {theme}
                </span>
            {/if}
        </div>
        <div class="comp-meta">
            <div>
                <span class="comp-info">{pieces}</span> Pieces,
                <span class="comp-info">{minifigs}</span> Minifigs
            </div>
        </div>
    </div>
</a>