<script lang="ts">
    export let id = "Id";
    export let name = "Name";
    export let tags = "Tags";
    export let line = "Line";
    export let franchise = "Franchise";
    export let image = "https://res.cloudinary.com/dxrq4f1v7/image/upload/q_auto/f_auto/v1781475194/IMG_6344_k5ck10.jpg";    
    import { CldImage } from "svelte-cloudinary";
</script>

<a class="comp-link-wrapper" href={`/nonswfigures/${id}`}>
    <div class="comp">
        <div class="comp-image">
            <CldImage
                width={600}
                height={400}
                src={image || "https://res.cloudinary.com/dxrq4f1v7/image/upload/q_auto/f_auto/v1781475194/IMG_6344_k5ck10.jpg"}
            />
        </div>
        <div class="comp-header">
            <span class="comp-title">
                {name}
            </span>
            <span class="comp-badges">
                <em>{franchise}</em>
            </span>
        </div>

<!--
        <div class="comp-meta">
            <div>
                <span>{line}</span>
            </div>
            <div>
                <span>{tags}</span>
            </div>
        </div>    
-->
    
    </div>
</a>