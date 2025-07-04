<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
</script>

<dev class="container">
    <p><a class="follow_link" href="/movies_and_tv">Back to list</a></p>

    <table>
        <thead>
            <tr>
                <th>Title</th>
                {#if data.disc.type === "Movie"}
                    <th><p><a class="follow_link" href="{data.disc.letterboxd}">{data.disc.title}</a></p></th>
                {:else}
                    <th>{data.disc.title}</th>
                {/if}
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Type</td>
                <td>{data.disc.type}</td>
            </tr>
            <tr>
                <td>Resolution</td>
                <td>{data.disc.resolution}</td>
            </tr>
            <tr>
                <td>Franchise</td>
                <td>{data.disc.franchise || 'None'}</td>
            </tr>
            <tr>
                <td>Watched</td>
                <td>{data.disc.watched === false ? 'No' : data.disc.watched === true ? 'Yes' : 'Error'}</td>
            </tr>
            <tr>
                <td>Label</td>
                <td>{data.disc.label || 'None'}</td>
            </tr>
            <tr>
                <td>Steelbook</td>
                <td>{data.disc.steelbook === false ? 'No' : data.disc.steelbook === true ? 'Yes' : 'Error'}</td>
            </tr>
        </tbody>
    </table>

    <p><a class="follow_link" href="/movies_and_tv/{data.disc.id}/edit">Edit</a></p>
</dev>