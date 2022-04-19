<script lang="ts">
    import type { StreamRecordAJAXData } from '../type/type'
    import { info, state } from '../lib/store'

    export let replays:StreamRecordAJAXData<'stream'>[] = [];

    export let matchInput:number;

    function toDate(ts:string){
        const date = new Date(ts);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${date.getHours()}시`;
    }

    function historyClick(e:MouseEvent){
        const tar = e.currentTarget as HTMLLabelElement;
        info.url =  `https://tetr.io/#r:${tar.dataset.url}`;
        state.update(v => {
            v.replay = true;
            return v;
        })
    }
</script>

<div id="history">
    {#each replays as replay, index}
        <input id="match-input-{index}" value={index} type="radio" class="match-input" bind:group={matchInput}/>
        <label on:click={historyClick} class="match-history" for="match-input-{index}" data-url={replay.replayid}>
            {#if replay.endcontext[0].user.username === info.user.name}
                <div class="history win">
                    <div class="versus versus-win">Win</div>
                    <div class="versus versus-vs">{replay.endcontext[0].user.username} vs {replay.endcontext[1].user.username}</div>
                    <div class="versus versus-time">{toDate(replay.ts)}</div>
                </div>
            {:else}
                <div class="history lose">
                    <div class="versus versus-lose">Lose</div>
                    <div class="versus versus-vs">{replay.endcontext[1].user.username} vs {replay.endcontext[0].user.username}</div>
                    <div class="versus versus-time">{toDate(replay.ts)}</div>
                </div>
            {/if}
        </label>
    {/each}
</div>

<style>
    #history {
        margin-top: 100px;
    }

    .match-input{
        display: none;
    }
    
    .match-input + .match-history{
        background-color: transparent;
    }

    .match-input:checked + .match-history{
        background-color: rgba(0, 0, 0, 0.8);
        color:white;
    }

    .match-history {
        display: block;
        margin-right: -4px;
        width: 720px;
        height: 50px;
        /* background-color: black; */
        border: 3px solid rgb(139, 139, 139);
        margin-bottom: 10px;
        cursor: pointer;
        transition: all 0.2s;
    }

    .match-history:hover {
        background-color: lightgray;
        border:3px solid black;
    }

    .history{
        display: inline-block;
        width: 100%;
        height: 100%;
    }

    .win{
        background-color: rgba(78, 120, 238, 0.3);
    }

    .lose {
        background-color: rgba(238, 78, 78, 0.3);
    }

    .versus{
        display: inline-block;
        font-size: 20px;
        margin-right: -4px;
        text-align: center;
        line-height: 50px;
        height: 50px;
        border-right: 3px solid rgb(139, 139, 139);
    }

    .versus-win {
        width: 80px;
        
    }

    .versus-lose {
        width: 80px;
    }

    .versus-time {
        width: 280px;
        border-right:none;
    }

    .versus-vs {
        width: 335px;
    }
</style>