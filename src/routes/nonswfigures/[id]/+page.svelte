<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from './$types';
    export let data: PageData;
    import { CldImage } from "svelte-cloudinary";
</script>

<div class="container">
    <div class="back">
        <p><a class="follow-link" href="/nonswfigures"><icon class="nf nf-fa-backward" title="Back"></icon> Back to List of Figures</a></p>
    </div>

    <h1>{data.figure.name}</h1>
    <h2> <em>{data.figure.franchise}</em> </h2>

    <CldImage
        width={400}
        height={400}
        src={data.figure.image}
    />

    <h3>Figure Information</h3>
    <p>Line: {data.figure.line}</p>
    <p>Tags: {data.figure.tags}</p>

</div>