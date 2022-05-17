import { writable } from 'svelte/store'

export const info = {
    url: '',
    user: {
        name: '',
        level: '',
        image: '',
        rating: '',
    }
};

export const state = writable({
    loader: false,
    replay: false,
});