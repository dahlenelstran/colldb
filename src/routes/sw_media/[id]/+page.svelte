<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
</script>

<dev class="container">
    <p><a class="follow-link" href="/sw_media">Back to all Star Wars Media</a></p>

    <h1>{data.media.title}</h1>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>{data.media.title}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Release Date</td>
                <td>{data.media.releaseDate}</td>
            </tr>
            <tr>
                <td>Is Canon</td>
                <td>{data.media.is_canon ? "Yes" : "No"}</td>
            </tr>
        </tbody>
    </table>

    <h2>Ownership and Completion</h2>
    <form action="?/log" method="post">
        <table>
            <tbody>
                <tr>
                    <td>
                        Completed
                    </td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="is_completed" checked={data.media.is_completed === true}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>
                        Owned
                    </td>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="is_owned" checked={data.media.is_owned === true}>
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
            </tbody>
        </table>
        <center>
            <button type="submit">Save</button>
        </center>
    </form>

    {#if data.games && data.games.length}
        <h2>Game Details</h2>
        <table>
            <thead>
                <tr>
                    <th>System</th>
                </tr>
            </thead>
            <tbody>
                {#each data.games as game}
                    <tr>
                        <td>{game.system}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if data.books && data.books.length}
        <h2>Book Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Format</th>
                    <th>Book Type</th>
                </tr>
            </thead>
            <tbody>
                {#each data.books as book}
                    <tr>
                        <td>{book.format}</td>
                        <td>{book.booktype}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if data.seasons && data.seasons.length}
        <h2>Season Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Show</th>
                </tr>
            </thead>
            <tbody>
                {#each data.seasons as season}
                    <tr>
                        <td>{season.show}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    {#if data.comics && data.comics.length}
        <h2>Comic Details</h2>
        <table>
            <thead>
                <tr>
                    <th>Run</th>
                    <th>Issue</th>
                </tr>
            </thead>
            <tbody>
                {#each data.comics as comic}
                    <tr>
                        <td>{comic.run}</td>
                        <td>{comic.issue}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    {/if}

    <p><a class="follow-link" href="/sw_media/{data.media.id}/edit">Edit</a></p>
</dev>