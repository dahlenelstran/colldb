<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
</script>

<div class="container">
    <div class="back">
        <p><a class="follow-link" href="/movies_and_tv"><icon class="nf nf-fa-backward" title="Back"></icon> Back to Disc List</a></p>
    </div>

    {#if data.disc.type === "Movie"}
        <h1><a class="follow-link" href="{data.disc.letterboxd}">{data.disc.title}</a></h1>
    {:else}
        <h1>{data.disc.title}</h1>
    {/if}

    {#if data.disc.watched === true}
        <div class="info">
            Watched
        </div>
    {:else}
        <div class="info">
            Not Watched
        </div>
    {/if}
    
    <div class="info">
        {data.disc.resolution}
    </div>

    {#if data.disc.franchise}
        <a class="linked-info" href={`/movies_and_tv?type=&resolution=&franchise=${data.disc.franchise}&watched=&label=&steelbook=&search=`}>
            <div>
                <span class="nf nf-fa-franchise" title="Franchise"></span>{data.disc.franchise} Franchise
            </div>
        </a>
    {/if}
    
    {#if data.disc.steelbook === true}
        <div class="info">
            <span class="nf nf-fa-steelbook" title="Steelbook"></span> Steelbook Edition
        </div>
    {/if}

    {#if data.disc.label}
        <div class="info">
            {data.disc.label}
        </div>
    {/if}

    <div class="edit">
        <p><a class="follow-link" href="/movies_and_tv/{data.disc.id}/edit">Edit {data.disc.title} <icon class="nf nf-fa-forward" title="Edit"></icon></a></p>
    </div>
</div>