<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
</script>

<div class="container">
    <div class="back">
        <p><a class="follow_link" href="/games"><icon class="nf nf-fa-backward" title="Back"></icon> Back to Games List</a></p>
    </div>

    <h1>{data.game.title}</h1>

    {#if data.game.is_played === true}
        <div class="info">
            Played
        </div>
    {:else}
        <div class="info">
            Not Played
        </div>
    {/if}

    {#each data.game.systems as x}
        <div class="info">
            {x.system} ({x.format})
        </div>
    {/each}

    {#if data.game.franchise}
        <a class="linked-info" href={`/games?search=&format=&system=&franchise=${data.game.franchise}`}>
            <div>
                {data.game.franchise} Franchise
            </div>
        </a>
    {/if}

    <div class="edit">
        <p><a class="follow_link" href="/games/{data.game.id}/edit">Edit <icon class="nf nf-fa-forward" title="Edit"></icon></a></p>
    </div>
</div>