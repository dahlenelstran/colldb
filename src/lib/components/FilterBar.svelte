<script lang="ts">
    export let onSubmit: (e: Event) => void = () => {};
    export let onReset: (e: Event) => void = () => {};
</script>

<form class="filterbar" on:submit|preventDefault={onSubmit} on:reset={onReset} autocomplete="off">
    <div class="filterbar-top">
        <slot name="dropdowns" />
    </div>
    <div class="filterbar-bottom">
        <div class="filterbar-search">
            <slot name="search" />
        </div>
        <div class="filterbar-actions">
            <button type="submit" class="filterbar-btn">Search</button>
            <button type="reset" class="filterbar-btn filterbar-reset">Reset</button>
        </div>
    </div>
</form>