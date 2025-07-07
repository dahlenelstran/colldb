<script lang="ts">
    export let title = "Title";
    export let resolution = "Resolution";
    export let id = "Id";
</script>

<style>
    .disc:hover {
        transform: translateY(-4px) scale(1.03);
        box-shadow: 0 8px 24px #0005;
        border-color: #e94560;
    }
    .disc:hover .disc-title {
        color: #e94560;
    }
    .disc-title {
        font-weight: bold;
        font-size: 1.25rem;
        color: #fff;
        margin-bottom: 0.5rem;
        text-shadow: 0 2px 8px #0008;
    }
    .disc-resolution {
        color: #b0b8d1;
        font-size: 1rem;
        margin-bottom: 0.2rem;
    }
</style>

<a class="disc-link-wrapper" href={`/movies_and_tv/${id}`}>
    <div class="disc">
        <div class="disc-title">{title}</div>
        <div class="disc-resolution">{resolution}</div>
    </div>
</a>
