<!-- Fix this shit bc damn this is ugly af -->

<script lang="ts">
    export let value: string = ""; // "" | "true" | "false"
    export let id = "tri-switch";

    const options = [
        { v: "false", label: "Off", color: "var(--danger, #e94560)" }, // left
        { v: "",      label: "All", color: "var(--muted, #666)"    }, // middle
        { v: "true",  label: "On",  color: "var(--accent, #7da0fa)" }  // right
    ];

    function setValue(v: string) {
        value = v;
    }

    function onKey(e: KeyboardEvent) {
        const idx = options.findIndex(o => o.v === value);
        if (e.key === "ArrowLeft") {
            const next = Math.max(0, idx === -1 ? 1 : idx - 1);
            value = options[next].v;
            e.preventDefault();
        } else if (e.key === "ArrowRight") {
            const next = Math.min(options.length - 1, idx === -1 ? 1 : idx + 1);
            value = options[next].v;
            e.preventDefault();
        } else if (e.key === " " || e.key === "Enter") {
            // space/enter cycles
            const next = ((idx === -1 ? 1 : idx) + 1) % options.length;
            value = options[next].v;
            e.preventDefault();
        }
    }

    $: activeIndex = options.findIndex(o => o.v === value);
    $: label = options[activeIndex]?.label ?? "All";
</script>

<div
    id={id}
    class="tri-switch"
    role="group"
    aria-label="Three state switch: Off / All / On"
    tabindex="0"
    on:keydown={onKey}
    title={`State: ${label}`}
>
    {#each options as opt, i}
        <button
            type="button"
            class:active={i === activeIndex}
            aria-pressed={i === activeIndex}
            aria-label={opt.label}
            on:click={() => setValue(opt.v)}
            style="--opt-color: {opt.color}"
        >
            <span class="label">{opt.label}</span>
        </button>
    {/each}
</div>

<style>
.tri-switch{
    display:inline-grid;
    grid-template-columns: repeat(3, minmax(40px, auto));
    gap: .25rem;
    padding: .25rem;
    background: var(--card-bg, #161618);
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,.04);
    align-items: center;
}
.tri-switch:focus{ outline: 2px solid rgba(125,160,250,.12); outline-offset: 3px; }

.tri-switch button{
    appearance: none;
    background: transparent;
    border: none;
    padding: .45rem .6rem;
    border-radius: 999px;
    color: var(--fg, #eaeaea);
    cursor: pointer;
    font-weight: 600;
    font-size: .85rem;
    transition: background .12s ease, transform .08s ease, color .08s;
}
.tri-switch button:hover{ transform: translateY(-1px); }

.tri-switch button.active{
    background: linear-gradient(180deg, var(--opt-color), rgba(0,0,0,0.12));
    box-shadow: 0 6px 18px rgba(0,0,0,0.35);
    color: #fff;
}
.label { white-space: nowrap; }
</style>