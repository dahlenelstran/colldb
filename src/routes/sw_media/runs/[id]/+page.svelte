<script lang="ts">
    import "$lib/assets/css/global.css";
    import type { PageData } from "../[id]/$types";
    export let data: PageData;
</script>

<div class="container">
    <p><a class="follow_link" href="/sw_media/runs">Back to all Star Wars Media</a></p>

    <h1>{data.run.title}</h1>
    <table>
        <thead>
            <tr>
                <th>Issue</th>
            </tr>
        </thead>
        <tbody>
            {#each data.issues as issue}
                <tr>
                    <td><p><a class="follow_link" href="/sw_media/{issue.id}">{issue.title}</a></p></td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>