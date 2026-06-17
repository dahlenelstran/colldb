<div class="grid-layout">
    <slot /> </div>

<style>
    .grid-layout {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(600px, 1fr));
        gap: 30px;
        margin-top: 20px;
        margin-bottom: 20px;
        padding-left: 300px;
        padding-right: 300px;
        width: 90%;
    }
</style>