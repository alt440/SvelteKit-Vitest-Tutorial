<script>
    import thumbIcon from '../assets/thumbsUpIcon6.png';

    export let id;
    export let idStrPrefix;
    export let message;
    //used for the delete feature
    export let rendered = true;
    let likes = 0;
    let dislikes = 0;

    $: fullIdExit = `${idStrPrefix}${id}`;

    const increaseLike = () => {
        ++likes;
    };

    const increaseDislike = () => {
        ++dislikes;
    }
</script>

{#if rendered}
    <div class={'infoBubble' + id}>
        <button id={fullIdExit} class="exit" on:click>X</button>
        <div class={'containerBubble ' + 'infoBubbleContainer'+id}>
            <div class="title">{message}</div>
            <div class="innerDiv">
                <button class="btnLike" on:click={increaseLike}><img src={thumbIcon} alt="Like button" width="20px"> &nbsp; {likes}</button>
                <button class="btnDislike" on:click={increaseDislike}><img src={thumbIcon} class="dislike" alt="Dislike button" width="20px"> &nbsp; {dislikes}</button>
            </div>
        </div>
    </div>
{/if}

<style>
    div.containerBubble{
        background-color: var(--fourth-color);
        border-radius: 5px;
        border: 2px solid var(--second-color);
        text-align: center;

        min-width: 300px;
        max-width: 20vw;
        min-height: 80px;
        align-items: center;
        display: flex;
        flex-direction: column;
        color: var(--second-color);
        word-wrap: break-word;
    }

    div.innerDiv {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    div.title {
        font-size: var(--title-font-size);
        margin-bottom: 8px;
    }

    button.exit{
        position: absolute;
        background-color: transparent;
        border: none;
        color: var(--second-color);
    }

    button{
        display:flex;
        gap: 1px;
        flex-direction: row;
        padding: 5px;
    }

    button.btnLike{
        margin-left: 10px;
        margin-right: 10px;
        background-color: var(--third-color);
        border-radius: 5px;
        color: var(--second-color);
    }

    button.btnLike:hover{
        cursor: pointer;
        opacity: 0.9;
    }

    button.btnDislike{
        background-color: var(--fifth-color);
        border-radius: 5px;
        color: var(--second-color);
    }

    button.btnDislike:hover{
        cursor: pointer;
        opacity: 0.9;
    }

    img.dislike {
        transform: scaleY(-1);
    }
</style>