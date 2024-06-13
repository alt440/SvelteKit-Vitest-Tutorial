<script>
    import { fade } from 'svelte/transition';

    export let message = "It's some Svelte!";
    //default value is false
	export let showModal = false;
</script>

{#if showModal}
    <!-- No value to onclick: takes value from call of component -->
    <div id="backdrop" class="backdrop" transition:fade={{ duration: 300}} on:click|self>
        <div class="modal">
            <p>{message}</p>
        </div>
    </div>
{/if}

<style>
    #backdrop {
        position: absolute;
        margin: 0;
        padding: 0;
        left: 0;
        top: 0;
        z-index: 5;
        height: 100vh;
        width: 100vw;
        background-color: rgba(0,0,0,0.5);
    }

	.modal {
        position: absolute;
        height: 10vh;
        width: 20vw;
        background-color: var(--second-color);
        border-radius: 28px;
        left: 50vw;
        top: 50vh;
        transform: translateX(-50%) translateY(50%);
        text-align: center;

        display:flex;
        align-items: center;
        justify-content: center;
    }

    p {
        font-size: 20px;
        color: var(--first-color);
    }
</style>