<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "./$types";
    export let data: PageData;

    function handleDelete(event: Event) {
        if (confirm("Are you sure you want to delete this item?")) {
            // Submit the form if confirmed
            (event.target as HTMLFormElement).submit();
        }
        // Otherwise, do nothing (form is not submitted)
    }
</script>

<div class="container" style="text-align: center;">
    <p><a class="follow_link" href="/movies_and_tv/{data.disc.id}">Back to {data.disc.title}</a></p>

    <form action="?/edit" method="post">
        <table>
            <thead>
                <tr>
                    <th>Column</th>
                    <th>Current Info</th>
                    <th>Input edits</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Title</td>
                    <td>{data.disc.title}</td>
                    <td>
                        <input type="text" name="title" value={data.disc.title}>
                    </td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>{data.disc.type}</td>
                    <td>
                        <label>
                            <input type="radio" name="type" value="Movie" checked={data.disc.type === 'Movie'}>Movie
                        </label>
                        <label>
                            <input type="radio" name="type" value="TV Show" checked={data.disc.type === 'TV Show'}>TV Show
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Resolution</td>
                    <td>{data.disc.resolution}</td>
                    <td>
                        <label>
                            <input type="radio" name="resolution" value="VHS" checked={data.disc.resolution === 'VHS'}>VHS
                        </label>
                        <label>
                            <input type="radio" name="resolution" value="DVD" checked={data.disc.resolution === 'DVD'}>DVD
                        </label>
                        <label>
                            <input type="radio" name="resolution" value="Blu-Ray" checked={data.disc.resolution === 'Blu-Ray'}>Blu-Ray
                        </label>
                        <label>
                            <input type="radio" name="resolution" value="4K" checked={data.disc.resolution === '4K'}>4K
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Franchise</td>
                    <td>{data.disc.franchise || 'None'}</td>
                    <td>
                        <input type="text" name="franchise" value={data.disc.franchise}>
                    </td>
                </tr>
                <tr>
                    <td>Watched</td>
                    <td>{data.disc.watched === false ? 'No' : data.disc.watched === true ? 'Yes' : 'Error'}</td>
                    <td>
                        <label>
                            <input type="radio" name="watched" value="true" checked={data.disc.watched === true}>Yes
                        </label>
                        <label>
                            <input type="radio" name="watched" value="false" checked={data.disc.watched === false}>No
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Label</td>
                    <td>{data.disc.label || 'None'}</td>
                    <td>
                        <input type="text" name="label" value={data.disc.label}>
                    </td>
                </tr>
                <tr>
                    <td>Steelbook</td>
                    <td>{data.disc.steelbook === false ? 'No' : data.disc.steelbook === true ? 'Yes' : 'Error'}</td>
                    <td>
                        <label>
                            <input type="radio" name="steelbook" value="true" checked={data.disc.steelbook === true}>Yes
                        </label>
                        <label>
                            <input type="radio" name="steelbook" value="false" checked={data.disc.steelbook === false}>No
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Letterboxd</td>
                    {#if !data.disc.letterboxd}
                    <td>None</td>
                    {:else}
                    <td><p><a class="follow_link" href="{data.disc.letterboxd}">{data.disc.letterboxd}</a></p></td>
                    {/if}
                    <td>
                        <input type="text" name="letterboxd" value={data.disc.letterboxd}>
                    </td>
                </tr>
            </tbody>
        </table>
        <button type="submit">Save</button>
    </form>
    

    <form action="?/delete" method="post" on:submit|preventDefault={handleDelete}>
        <button type="submit" class="red-btn">Delete</button>
    </form>
</div>