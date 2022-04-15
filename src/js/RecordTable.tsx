import React from 'react'

class RecordTable extends React.Component{
    constructor(){
        super({})
    }
    override render(){
        return (
            <div id="search">
                <p>Replay</p>
                <button id="replay">▶</button>

                <input type="text" id="usernameInput" placeholder="유저명(소문자로 입력해주세요.)" />
                <button id="submit">검색</button>
                {/* 유저 정보 */}
                <div id="username"></div>
                <div id="level"></div>
                <img id="rank_image" src="" />
                {/* 통산 전적 */}
                <div id="total_his" className="WL"></div>
                <div id="total_win" className="WL wins"></div>
                <div id="total_lose" className="WL loses"></div>
                <div id="winRate" className="WL"></div><br />
                {/* 최근 전적 */}
                <div id="recent_his" className="WL"></div>
                <div id="recent_win" className="WL wins"></div>
                <div id="recent_lose" className="WL loses"></div>

                {/* 기록 */}
                <div id="records">
                    <table id="recordTable">
                    </table>
                </div>

                {/* 전적 display */}
                <div id="history"></div>
            </div>
        )
    }
}

export default RecordTable;