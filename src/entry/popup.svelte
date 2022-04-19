<script lang="ts">
    import Search from '../lib/Search.svelte'
    import { state } from '../lib/store'
    import { fade } from 'svelte/transition'

    let loader = false;
    state.subscribe(v => loader = v.loader);

</script>
<header>
    <img src="/images/logo.png" id="logo" alt="logo">
    <img src="/images/header_background.png" id="header-background" alt="background">
</header>
{#if loader}
    <div transition:fade id="loader"></div>
{/if}
<Search />
<style>
    :global(body){
        width: 750px;
        height: 500px;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /* background-color: #131621; */
        font-family: 'Noto Sans';
    }

    :global(::-webkit-scrollbar) {
        display: none;
    }

    #logo {
        top: 12px;
        left: 10px;
        position: absolute;
    }

    #loader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        transition: 0.2s ease;
    }

    #loader::before{
        content:"Now Loading";
        color:white;
        font-size: 50px;
        animation:loader 1.5s steps(4) infinite;
        position: absolute;
        left:50%;
        top:50%;
        transform: translate(-50%, -50%);
        white-space: nowrap;
    }

    @keyframes loader{
        0%{
            content:"Now Loading";
        }
        25%{
            content:"Now Loading.";
        }
        50%{
            content:"Now Loading..";
        }
        75%{
            content:"Now Loading...";
        }
        100%{
            content:"Now Loading";
        }
    }
</style>
