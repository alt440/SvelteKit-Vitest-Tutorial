<script>
	//https://svelte.dev/repl/28996f04783542ceafed7cc6a85128b9?version=3.23.0
	import Modal from '$lib/Modal.svelte';
	import InfoBubble from '$lib/InfoBubble.svelte';

	// internal var
	let showModal = false;
	let messageModal;
	let infoBubbleGroup = [];
	let titleIdeas;

	let infoBubbleIdPrefix = "infoBubbleExit";

	const surprise = () => {

		//if its currently showing, add component to store
		if(showModal && infoBubbleGroup.length < 10){
			let finalMessage = messageModal;
			if(messageModal === undefined || messageModal === ""){
				finalMessage = "It's some Svelte!";
			}

			//get last id
			let nextId = 0;
			if(infoBubbleGroup.length > 0){
				nextId = infoBubbleGroup[infoBubbleGroup.length - 1].id + 1;
			}
			infoBubbleGroup[infoBubbleGroup.length] = { id:nextId, message: finalMessage, rendered: true };
			messageModal = "";
		}
		showModal = !showModal;
	};

	function removeElement(id) {
		/*
		 * IMPORTANT! 
		 * I have created an attribute 'rendered' to the component. This attribute allows us to determine whether 
		 * html content is displayed for the component. When no html is displayed, I believe it deletes the 
		 * component (onDestroy call in the background?).
		 * Without the logic below, the values for like / dislike were passed to the component taking the deleted
		 * instance's place.
		 */
		infoBubbleGroup.forEach(function(infoBubble){
			if(infoBubble.id === id){
				infoBubble.rendered = false;
			}
		});

		//triggers reflow so components re-rendered
		infoBubbleGroup = [...infoBubbleGroup];
	}
</script>

<main>
	<!-- To avoid image glitch, pre-render element and make it invisible -->
	<div class="invisibleDiv">
		<InfoBubble id=999 idStrPrefix={infoBubbleIdPrefix} message="" />
	</div>
	<Modal showModal={showModal} message={messageModal} on:click={surprise} />
	<div class="mainDiv1">
		<div class="titleDiv">
			<label>Title of this Debate: </label>
			<input type="text" bind:value={titleIdeas}>
		</div>
		<div>
			<div class="inputsToSurprise">
				<input type="text" class="daBestInput" bind:value={messageModal} />
				<button class="surpriseButton" on:click={surprise}>Add Suggestion</button>
			</div>
			<br>
			<div class="infoBubbles">
				{#each infoBubbleGroup as item, index}
						<InfoBubble id={item.id} idStrPrefix={infoBubbleIdPrefix} message={item.message} rendered={item.rendered} on:click={() => removeElement(item.id)} />
				{/each}
			</div>
		</div>
	</div>
</main>

<style>
	:global(:root){
   		--first-color: #464A4E;
		--second-color: #EEEEEE;
		--third-color: #025179;
		--fourth-color: #2B2D42;
		--fifth-color: #990000;
		--def-font-size: 18px;
		--title-font-size: 24px;
	}

	main {
		background-color: var(--first-color);
		width: 100vw;
		height: 100vh;
		top: 0;
		left: 0;
		margin: 0;
		padding: 0;
		position: absolute;
		font-size: var(--def-font-size);
	}

	div.mainDiv1{
		top: 15vh;
		position: relative;
	}

	button {
		height: fit-content;
		width: auto;
	}

	.inputsToSurprise {
		position: relative;
		top: 10vh;
		width: 100%;
		text-align: center;
		display: inline-block;
	}

	.infoBubbles {
		position: relative;
		top: 10vh;
		max-width: 100vw;
		margin-left: 10vw;
		margin-right: 10vw;
		margin-top: 5vh;

		display:flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 5vw;
	}

	input {
		appearance: none;
		border: none;
		outline: none;
		border-bottom: .2em solid var(--second-color);
		background-color: transparent;
		padding: .4em;
		color: var(--second-color);
		caret-color: var(--second-color);
		margin-right: 15px;
	}

	button.surpriseButton {
		appearance: none;
		border: .2em solid var(--second-color);
		background: transparent;
		padding: .85em 1.5em;
		color: var(--second-color);
		transition: 0.2s;
		border-radius: 5px;
	}

	button.surpriseButton:hover {
		border: .2em solid var(--first-color);
		background: var(--second-color);
		color: var(--first-color);
	}

	div.titleDiv {
		display:flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		gap: 10px;
		color: var(--second-color);
		width: 100%;
		font-size: var(--title-font-size);
		top:2vh;
		position:relative;
	}

	.invisibleDiv {
		pointer-events: none;
		opacity: 0;
		z-index: -1;
		position: absolute;
	}
</style>