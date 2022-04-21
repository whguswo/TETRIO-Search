<script lang="ts">
    import Table from './Table.svelte';
    import History from './History.svelte';
    import Record from './Record.svelte';
    import { getJson, getStream, XPtoLevel, getRecord, parseMS } from '../lib/module';
    import { info, state } from '../lib/store'
    import type { RecordAJAXData, StreamAJAXData, StreamRecordAJAXData, UserRecordAJAXData } from '../type/type'

    let userInput:HTMLInputElement;

    let replays:StreamRecordAJAXData<'stream'>[] = [];

    let replay = false;

    let record = false;

    let matchInput:number;

    const recordInfo = {
        total_win:'',
        total_lose:'',
        win_rate:'',
        recent_win:'',
        recent_lose:'',
    };

    const tableInfo = {
        finalTime:'',
        blitzScore:'',
    }

    state.subscribe(value => replay = value.replay);

    async function search(username:string){
        state.update(v => {
            v.loader = true;
            v.replay = false;
            return v;
        });

        matchInput = -1;
        const json = await getJson(username) as RecordAJAXData;
        if(json.error){

            state.update(v => {
                v.loader = false;
                return v;
            });
            record = false;
            info.user.name = '유저가 존재하지 않습니다.';
            info.user.level = '';
            info.user.image = '';
            replays = [];

            userInput.value = '';

            return false;
        }

        const streams = await getStream(json.data.user._id) as StreamAJAXData;
        let win_flag = 0;
        let lose_flag = 0;
        for(let replay of replays){
            if(replay.endcontext[0].user.username === username){
                win_flag++;
            } else {
                lose_flag++;
            }
        }
        
        const recordsJSON = await getRecord(username) as UserRecordAJAXData;
        const blitzRecord = recordsJSON.data.records.blitz.record;
        const line40Record = recordsJSON.data.records['40l'].record;
        if(blitzRecord){
            tableInfo.blitzScore = blitzRecord.endcontext.score
                .toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
        } else {
            tableInfo.blitzScore = 'Unplayed';
        }

        if(line40Record){
            const finalTime = parseMS(line40Record.endcontext.finalTime);
            tableInfo.finalTime = `${finalTime.m}:${finalTime.s}`;
        } else {
            tableInfo.finalTime = 'Unplayed';
        }
        const leagueInfo = json.data.user.league;
        info.user.name = username;
        info.user.level = `Level : ${XPtoLevel(json.data.user.xp)}`;
        info.user.image = `https://tetr.io/res/league-ranks/${leagueInfo.rank}.png`;
        replays = streams.data.records;
        state.update(v => {
            v.loader = false;
            return v;
        });
        
        recordInfo.total_win = `${leagueInfo.gameswon}승`;
        recordInfo.total_lose = `${leagueInfo.gamesplayed - leagueInfo.gameswon}패`;
        recordInfo.win_rate = `(승률: ${Math.floor(leagueInfo.gameswon / leagueInfo.gamesplayed * 10000) / 100}%)`;
        recordInfo.recent_win = `${win_flag}승`;
        recordInfo.recent_lose = `${lose_flag}패`;
        record = true;
    }

    function usernameKeyupEvent(e:Event){
        if(((e instanceof KeyboardEvent && e.code === 'Enter') || e.currentTarget instanceof HTMLButtonElement) && userInput.validity.valid){
            search(userInput.value);
        }
    }

    function showReplay(e:MouseEvent){
        if(replay){
            window.open(info.url);
        }
    }

</script>
<div id="search">
    {#if replay}
        <h3 id="replay-header">Replay</h3>
        <button on:click={showReplay} id="replay">▶</button>
    {/if}
    <input bind:this={userInput} id="user-input" required minlength={3} maxlength={16} pattern="[0-9a-zA-Z\\_\\-]*" on:keyup={usernameKeyupEvent} type="text" placeholder="유저명(소문자로 입력해주세요.)">
    <button id="submit" on:click={usernameKeyupEvent}>검색</button>
    <!-- 유저 정보 -->
    <div id="username">{info.user.name}</div>
    <div id="level">{info.user.level}</div>
    {#if info.user.image}
        <img id="rank-image" src={info.user.image} alt="rank">
    {/if}
    {#if record}
        <!-- 전적 전적 -->
        <Record {...recordInfo} />
        <!-- 기록 -->
        <Table {...tableInfo} />
    {/if}


    <!-- 전적 display -->
    <History {matchInput} {replays} />
</div>

<style>
    #search {
        margin: 10px;
    }

    #replay {
        position: absolute;
        top: 325px;
        right: 15px;
        font-size: 19px;
        width: 50px;
        height: 50px;
        border: 3px solid black;
        text-align: center;
        line-height: 40px;
        background-color: greenyellow;
        cursor: pointer;
        transition: filter 0.2s;
    }

    #replay:hover{
        filter:invert(0.8);
    }

    #user-input {
        width: 500px;
        height: 32px;
        font-size: 15px;
        border: 3px solid black;
        border-radius: 5px;
        background-color: rgb(233, 233, 233);
        font-family: 'Noto Sans';
    }

    #replay-header{
        position: absolute;
        top: 270px;
        right: 15px;
        font-size: 20px;
    }

    #submit {
        width: 100px;
        height: 40px;
        font-size: 15px;
        border: 3px solid rgb(0, 0, 0);
        /* color */
        border-radius: 5px;
        background-color: rgb(78, 120, 238);
        font-family: 'Noto Sans';
        transition: filter 0.2s;
        cursor: pointer;
    }

    #submit:hover{
        filter:invert(0.8);
    }

    #username {
        margin-top: 10px;
        font-size: 40px;
    }

    #level {
        font-size: 20px;
    }

    #rank-image {
        position: absolute;
        top: 170px;
        /* right: 15px; */
        left: 280px;
        width: 130px;
        height: 130px;
    }
</style>