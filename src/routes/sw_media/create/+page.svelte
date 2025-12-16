<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "./$types";
</script>

<dev class="container">
    <p><a class="follow_link" href="/sw_media">Back to all Star Wars Media</a></p>

    <form action="?/edit" method="post">
        <table>
            <thead>
                <tr>
                    <th>Column</th>
                    <th>Input</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Title</td>
                    <td>
                        <input type="text" name="title">
                    </td>
                </tr>
                <tr>
                    <td>Type</td>
                    <td>
                        <label>
                            <input type="radio" name="type" value="Movie">Movie
                        </label>
                        <label>
                            <input type="radio" name="type" value="TV Show">TV Show
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Resolution</td>
                    <td>
                        <label>
                            <input type="radio" name="resolution" value="VHS">VHS
                        </label>
                        <label>
                            <input type="radio" name="resolution" value="DVD">DVD
                        </label>
                        <label>
                            <input type="radio" name="resolution" value="Blu-Ray">Blu-Ray
                        </label>
                        <label>
                            <input type="radio" name="resolution" value="4K">4K
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Franchise</td>
                    <td>
                        <input type="text" name="franchise">
                    </td>
                </tr>
                <tr>
                    <td>Watched</td>
                    <td>
                        <label>
                            <input type="radio" name="watched" value="true">Yes
                        </label>
                        <label>
                            <input type="radio" name="watched" value="false">No
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Label</td>
                    <td>
                        <input type="text" name="label">
                    </td>
                </tr>
                <tr>
                    <td>Steelbook</td>
                    <td>
                        <label>
                            <input type="radio" name="steelbook" value="true">Yes
                        </label>
                        <label>
                            <input type="radio" name="steelbook" value="false">No
                        </label>
                    </td>
                </tr>
                <tr>
                    <td>Letterboxd</td>
                    <td>
                        <input type="text" name="letterboxd">
                    </td>
                </tr>
            </tbody>
        </table>

        <button type="submit">Add</button>
    </form>
</dev>