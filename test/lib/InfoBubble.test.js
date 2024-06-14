import {it, expect} from 'vitest'
import {render, fireEvent, screen} from '@testing-library/svelte'
import InfoBubble from '../../src/lib/InfoBubble.svelte'

it('Verify the id given to the info bubble', () => {
    const {component, container} = render(InfoBubble, {id: "1", idStrPrefix: "theInfoBubble", message: "The best letter is A", rendered: true});
    
    const infoBubbleElement = container.querySelector("#theInfoBubble1");

    expect(infoBubbleElement).toBeDefined();
});

it('Verify no render', () => {
    const {component, container} = render(InfoBubble, {id: "1", idStrPrefix: "theInfoBubble", message: "The best letter is A", rendered: false});

    const infoBubbleElement = container.querySelector("#theInfoBubble1");

    expect(infoBubbleElement).toBeNull();
});

it('Verify basic number of likes and dislikes', () => {
    const {component, container} = render(InfoBubble, {id: "1", idStrPrefix: "theInfoBubble", message: "The best letter is A", rendered: true});
    
    const btnLike = container.querySelector(".btnLike");
    let currentLikes = btnLike.textContent.trim();
    const btnDislike = container.querySelector(".btnDislike");
    let currentDislikes = btnDislike.textContent.trim();

    expect(currentLikes).toBe("0");
    expect(currentDislikes).toBe("0");
});

it('Verify increase like after click', async () => {
    const {component, container} = render(InfoBubble, {id: "1", idStrPrefix: "theInfoBubble", message: "The best letter is A", rendered: true});
    
    const btnLike = container.querySelector(".btnLike");
    let currentLikes = btnLike.textContent.trim();

    const btnDislike = container.querySelector(".btnDislike");
    let currentDislikes = btnDislike.textContent.trim();
    await fireEvent.click(btnLike);

    await btnLike.textContent.trim() !== currentLikes;
    let newLikes = btnLike.textContent.trim();
    let newDislikes = btnDislike.textContent.trim();

    expect(newLikes).toBe("1");
    expect(newDislikes).toBe(currentDislikes);
    expect(newDislikes).toBe("0");
});

it('Verify increase dislike after click', async () => {
    const {component, container} = render(InfoBubble, {id: "1", idStrPrefix: "theInfoBubble", message: "The best letter is A", rendered: true});

    const btnLike = container.querySelector(".btnLike");
    let currentLikes = btnLike.textContent.trim();

    const btnDislike = container.querySelector(".btnDislike");
    let currentDislikes = btnDislike.textContent.trim();
    await fireEvent.click(btnDislike);

    await btnDislike.textContent.trim() !== currentDislikes;
    let newLikes = btnLike.textContent.trim();
    let newDislikes = btnDislike.textContent.trim();

    expect(newDislikes).toBe("1");
    expect(newLikes).toBe(currentLikes);
    expect(newLikes).toBe("0");
});

it('Verify message on object', () => {
    let messageInfoBubble = "The best letter is A"
    const {component, container} = render(InfoBubble, {id: "1", idStrPrefix: "theInfoBubble", message: messageInfoBubble, rendered: true});

    const titleElement = container.querySelector("div.title");

    expect(titleElement.textContent).toBe(messageInfoBubble);
});