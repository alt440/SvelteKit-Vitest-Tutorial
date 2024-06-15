import {it, expect} from 'vitest'
import {render, fireEvent, screen} from '@testing-library/svelte'
import Modal from '../../src/lib/Modal.svelte'

it('Verify modal is a no show when showModal = false', () => {
    const {component, container} = render(Modal, {message: "The best letter is A", showModal: false});

    const modal = container.querySelector("#backdrop");

    expect(modal).toBeNull();
});

it('Verify modal is shown when showModal = true', () => {
    const {component, container} = render(Modal, {message: "The best letter is A", showModal: true});

    const modal = container.querySelector("#backdrop");

    expect(modal).toBeDefined();
});