const usernameInput = document.querySelector<HTMLInputElement>("#usernameInput")
const button = document.querySelector<HTMLButtonElement>("#submit")
const p = document.querySelector("p")
const replay = document.querySelector<HTMLButtonElement>("#replay")
const usernameDiv = document.querySelector<HTMLDivElement>("#username")
const level = document.querySelector<HTMLDivElement>("#level")
const rank_image = document.querySelector<HTMLImageElement>("#rank_image")
const total_his = document.querySelector<HTMLDivElement>("#total_his")
const total_win = document.querySelector<HTMLDivElement>("#total_win")
const total_lose = document.querySelector<HTMLDivElement>("#total_lose")
const winRate = document.querySelector<HTMLDivElement>("#winRate")
const recent_his = document.querySelector<HTMLDivElement>("#recent_his")
const recent_win = document.querySelector<HTMLDivElement>("#recent_win")
const recent_lose = document.querySelector<HTMLDivElement>("#recent_lose")
const recordTable = document.querySelector<HTMLTableElement>("#recordTable")
const history = document.querySelector<HTMLDivElement>("#history")

const loader = document.querySelector<HTMLDivElement>('.loader');
let originUrl = 'https://ch.tetr.io';
// const html = document.querySelector('html');
if(import.meta?.env){
    if(import.meta.env.MODE === 'development'){
        originUrl = '';
    }
}
let replayURL = ""
let replaySelected = false

const XPtoLevel = (xp:number) => {
    return Math.floor(Math.pow(xp / 500, 0.6) + (xp / (5000 + Math.max(0, xp - 4000000) / 5000)) + 1)
}
const getStream = async (streamID:string) => {
    const result = await fetch(`${originUrl}/api/streams/league_userrecent_${encodeURIComponent(streamID)}`, {
        method: 'GET'
    });
    let data = await result.text()
    return data
}
const getRecord = async (user:string) => {
    const result = await fetch(`${originUrl}/api/users/${user}/records`, {
        method: 'GET'
    });
    let data = await result.text()
    return data
}
const parseMS = (oms:number) => {
    const roms = Math.round(oms);

    const ms = roms % 1000;
    const s = Math.floor(roms / 1000) % 60;
    const m = Math.floor(roms / 60000);

    return {
        ms: ms.toString().padStart(3, '0'),
        s: s.toString().padStart(2, '0'),
        m: m.toString()
    };
}

usernameInput.addEventListener("keyup", (e) => {
    if (e.keyCode == 13) {
        if (usernameInput.value && usernameInput.value.indexOf("\\") == -1 && usernameInput.value.indexOf("/") == -1) {
            search(usernameInput.value)
        }
    }
})
button.addEventListener("click", () => {
    if (usernameInput.value) {
        search(usernameInput.value)
    }
})
replay.addEventListener("click", () => {
    if (replaySelected) {
        window.open(replayURL)
    }

})

const search = async (username:string) => {
    recordTable.innerHTML = ''
    loader.style.opacity = '1';
    loader.style.display = 'block'
    history.innerHTML = ''
    const result = await fetch(`${originUrl}/api/users/${username}`, {
        method: 'GET',
    });
    let data = await result.text()
    let json = await JSON.parse(data)
    console.log(json)
    if (json.error) {
        replay.style.display = "none"
        p.style.display = "none"
        rank_image.style.display = "none"
        usernameDiv.innerHTML = "유저가 존재하지 않습니다."
        level.innerHTML = ""
        loader.style.opacity = "0";
        usernameInput.value = ""
        total_his.innerHTML = ""
        total_win.innerHTML = ""
        total_lose.innerHTML = ""
        winRate.innerHTML = ""
        recent_his.innerHTML = ""
        recent_win.innerHTML = ""
        recent_lose.innerHTML = ""

        setTimeout(() => {
            loader.style.display = 'none';
        }, 400);
        return false
    }
    let streamID = json.data.user._id
    let streams = JSON.parse(await getStream(streamID))
    console.log(streams)
    usernameDiv.innerHTML = username
    level.innerHTML = `Level : ${XPtoLevel(json.data.user.xp)}`
    let arr = streams.data.records
    let win_flag = 0
    let lose_flag = 0
    for (let i = 0; i < arr.length; i++) {
        let match_history = document.createElement("div")
        match_history.classList.add("match_history")
        if (arr[i].endcontext[0].user.username == username) {
            let history_win = document.createElement("div")
            history_win.classList.add("history_win")

            let versus_win = document.createElement("div")
            versus_win.classList.add("versus_win")
            versus_win.innerHTML = "Win"
            let versus = document.createElement("div")
            versus.classList.add("versus")
            versus.innerHTML = `${arr[i].endcontext[0].user.username} vs ${arr[i].endcontext[1].user.username}`
            let versus_time = document.createElement("div")
            versus_time.classList.add("versus_time")
            let fullDate = new Date(arr[i].ts)
            versus_time.innerHTML = `${fullDate.getFullYear()}년 ${fullDate.getMonth() + 1}월 ${fullDate.getDate()}일 ${fullDate.getHours()}시`

            history_win.append(versus_win)
            history_win.append(versus)
            history_win.append(versus_time)
            match_history.append(history_win)
            win_flag++
        } else {
            let history_lose = document.createElement("div")
            history_lose.classList.add("history_lose")

            let versus_lose = document.createElement("div")
            versus_lose.classList.add("versus_lose")
            versus_lose.innerHTML = "Lose"
            let versus = document.createElement("div")
            versus.classList.add("versus")
            versus.innerHTML = `${arr[i].endcontext[1].user.username} vs ${arr[i].endcontext[0].user.username}`
            let versus_time = document.createElement("div")
            versus_time.classList.add("versus_time")
            let fullDate = new Date(arr[i].ts)
            versus_time.innerHTML = `${fullDate.getFullYear()}년 ${fullDate.getMonth() + 1} 월 ${fullDate.getDate()}일 ${fullDate.getHours()}시`

            history_lose.append(versus_lose)
            history_lose.append(versus)
            history_lose.append(versus_time)
            match_history.append(history_lose)
            lose_flag++
        }
        match_history.addEventListener("click", () => {
            replaySelected = true
            let historys = document.querySelectorAll<HTMLDivElement>(".match_history")
            historys.forEach(div => {
                // div.style.backgroundColor = "#ffffff"
                div.style.backgroundColor = ""
            });
            match_history.style.backgroundColor = "#f3f598"
            match_history.style.border = "3px solid black"
            console.log(arr[i].replayid)
            replayURL = `https://tetr.io/#r:${arr[i].replayid}`
        })
        match_history.addEventListener("mouseover", () => {
            match_history.style.border = "3px solid black"
        })
        match_history.addEventListener("mouseout", () => {
            match_history.style.border = "3px solid rgb(139, 139, 139)"
        })
        history.append(match_history)
    }
    let recordJSON = JSON.parse(await getRecord(username))
    console.log(recordJSON)
    if (recordJSON.data.records["blitz"].record != null) {
        let blitzScore = recordJSON.data.records["blitz"].record.endcontext.score
        blitzScore = blitzScore.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }
    // console.log(recordJSON.data.records["40l"].record.endcontext.finalTime)
    let leagueInfo = json.data.user.league
    let img_url = `https://tetr.io/res/league-ranks/${leagueInfo.rank}.png`
    total_his.innerHTML = "통산전적"
    total_win.innerHTML = `${leagueInfo.gameswon}승`
    total_lose.innerHTML = `${leagueInfo.gamesplayed - leagueInfo.gameswon}패`
    winRate.innerHTML = `(승률: ${Math.floor(leagueInfo.gameswon / leagueInfo.gamesplayed * 10000) / 100}%)`
    recent_his.innerHTML = "최근전적"
    recent_win.innerHTML = `${win_flag}승`
    recent_lose.innerHTML = `${lose_flag}패`
    p.style.display = 'inline'
    replay.style.display = 'inline-block'
    rank_image.src = img_url
    rank_image.style.display = "block"
    console.log(Math.floor(leagueInfo.rating))
    for (let j = 0; j < 2; j++) {
        const tr = document.createElement("tr")
        const td1 = document.createElement("td")
        const td2 = document.createElement("td")
        if (j == 0) {
            td1.innerHTML = "40 Lines"
            td2.innerHTML = "Blitz"
            tr.append(td1)
            tr.append(td2)
        } else {
            let finalTime, blitzScore
            if (recordJSON.data.records["40l"].record == null) {
                td1.innerHTML = `Unplayed`
            } else {
                finalTime = recordJSON.data.records["40l"].record.endcontext.finalTime
                finalTime = parseMS(finalTime)
                td1.innerHTML = `${finalTime.m}:${finalTime.s}`
            }
            if (recordJSON.data.records["blitz"].record == null) {
                blitzScore = "Unplayed"
            } else {
                blitzScore = recordJSON.data.records["blitz"].record.endcontext.score
                blitzScore = blitzScore.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
            }

            td2.innerHTML = blitzScore
            tr.append(td1)
            tr.append(td2)
        }
        recordTable.append(tr)
    }

    loader.style.opacity = '0';
    usernameInput.value = ''
    await new Promise(res => setTimeout(res, 400))
    loader.style.display = 'none';
    return true;
}

export {};