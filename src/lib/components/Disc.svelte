<script lang="ts">
    export let title = "Title";
    export let resolution = "Resolution";
    export let id = "Id";
</script>

<a class="disc-link-wrapper" href={`/movies_and_tv/${id}`}>
    <div class="disc">
        <div class="disc-title">{title}</div>
        <div class="disc-resolution">{resolution}</div>
    </div>
</a>