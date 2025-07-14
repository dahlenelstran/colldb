<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[set_number]/$types";
    export let data: PageData;

    $: ppp = data.set.msrp / data.set.pieces;
    $: ppm = data.set.msrp / data.set.minifigs;
</script>

<div class="container">
    <div class="back">
        <p><a class="follow_link" href="/lego"><icon class="nf nf-fa-backward" title="Back"></icon> Back to Lego List</a></p>
    </div>

    <h1>{data.set.set_number} / {data.set.title}</h1>

    <a class="linked-info" href={`/lego?search=&year=&theme=${data.set.theme_id}&license=`}>
            <div>
                {data.set.theme_title}
            </div>
        </a>
    
    <div class="info">
        {data.set.pieces} Pieces, {data.set.minifigs} Minifigs
    </div>
    
    <div class="info">
        ${data.set.msrp}, Released in {data.set.year}
    </div>

    <div class="info">
        Price per Piece: ${ppp.toFixed(2)}
        <!-- Compare to Theme + Graph-->
        <!-- Compare to All + Graph-->
    </div>

    <div class="info">
        Price per Minifig: ${ppm.toFixed(2)}
        <!-- Compare to Theme + Graph-->
        <!-- Compare to All + Graph-->
    </div>

    <div class="edit">
        <p><a class="follow_link" href="/lego/{data.set.set_number}/edit">Edit {data.set.title} <icon class="nf nf-fa-forward" title="Edit"></icon></a></p>
    </div>
</div>