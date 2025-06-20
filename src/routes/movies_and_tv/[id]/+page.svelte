<script lang="ts">
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
</script>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    table {
        margin-bottom: 20px; /* Add some space between tables */
        border-collapse: collapse; /* Collapse borders so they don't double up */
        width: 100%; /* Set table width to 100% */
    }

    th, td {
        border: 1px solid #ddd; /* Add border to table cells */
        padding: 8px; /* Add padding to table cells */
        text-align: left; /* Align text to the left within cells */
    }

    th {
        background-color: #f2f2f2; /* Add background color to table header cells */
    }

    .follow_link {
      color: rgb(218, 32, 193);
      text-decoration: none;
      border: none;
      padding: 0;
    }

    p {
      text-align: left;
      font-size: 1rem;
      margin-top: 0; /* Adjusted margin-top */
      height: auto; /* Fixed height */
      display: block;
      padding-bottom: 0;
    }
</style>

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