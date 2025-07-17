<script lang="ts">
    import "$lib/assets/css/global.css";
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";
    import type { PageData } from "../$types";
    export let data: PageData;
</script>

<div class="container">
    <h1>{data.theme.title} Statistics</h1>
</div>