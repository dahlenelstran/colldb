<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
</script>

<div class="container">
    <div class="back">
        <p><a class="follow-link" href="/figures"><icon class="nf nf-fa-backward" title="Back"></icon> Back to Lines</a></p>
        <p><a class="follow-link" href="/figures/list"><icon class="nf nf-fa-backward" title="Back"></icon> Back to List of Figures</a></p>
    </div>

    <h1>{data.figure.name}</h1>
    <h2> <em><a class="follow-link" href="/lines/{data.figure.line_id}">{data.figure.line_title}</a></em> </h2>

    <h3>Figure Information</h3>
    <p>Stamp Year: {data.figure.stamp_year}</p>
    <p>Link: <a class="follow-link" href="{data.figure.link}">{data.figure.link}</a></p>
    <p>Owned: {data.figure.owned ? "Yes" : "No"}</p>
    <p>Notes: {data.figure.notes}</p>
    <p>Media Source: {data.figure.media_source}</p> <!-- eventually link to list filtered by media source -->
    <p>{data.figure.line_title}: {data.figure.line_start} - {data.figure.line_end}</p>
    <p>Scale: {data.figure.scale}" inch</p>

</div>