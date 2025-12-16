<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "./$types";
</script>

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
                    <td>Set Number</td>
                    <td>
                        <input type="text" name="set_number">
                    </td>
                </tr>
                <tr>
                    <td>Title</td>
                    <td>
                        <input type="text" name="title">
                    </td>
                </tr>
                <tr>
                    <td>Year</td>
                    <td>
                        <input type="text" name="year">
                    </td>
                </tr>
                <tr>
                    <td>Minifigure Count</td>
                    <td>
                        <input type="text" name="minifigs">
                    </td>
                </tr>
                <tr>
                    <td>Piece Count</td>
                    <td>
                        <input type="text" name="pieces">
                    </td>
                </tr>
                <tr>
                    <td>MSRP</td>
                    <td>
                        <input type="text" name="msrp">
                    </td>
                </tr>
                <tr>
                    <td>Theme</td>
                    <td>
                        <input type="text" name="theme">
                    </td>
                </tr>
                <!-- Quantity default to 1, Built default to true -->
            </tbody>
        </table>

        <button type="submit">Add</button>
    </form>
</dev>