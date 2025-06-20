<script lang="ts">
    import type { PageData } from "./$types";
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
    <p><a class="follow_link" href="/movies_and_tv">Back to List</a></p>

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