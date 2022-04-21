import { writable } from 'svelte/store'

export const info = {
    url:'',
    user: {
        name:'',
        level:'',
        image:'',
    }
};

export const state = writable({
    loader:false,
    replay:false,
});