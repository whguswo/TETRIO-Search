import React from 'react'
import RecordTable from './RecordTable'

interface UserRecord{
    name:string;
    class:string;
    value:string;
}

interface UserProps{
    username:string;
    level:string;
    rank_image:string;
    record:UserRecord[];
    history:string;
}

class Search extends React.Component<UserProps>{
    constructor(){
        super({
            username:'',
            level:'',
            rank_image:'',
            history:'',
            record:[
                {name:'total_his', class:'WL', value:''},
                {name:'total_win', class:'WL wins', value:''},
                {name:'total_lose', class:'WL loses', value:''},
                {name:'winrate', class:'WL', value:''},
                {name:'recent_his', class:'WL', value:''},
                {name:'recent_win', class:'WL wins', value:''},
                {name:'recent_lose', class:'WL loses', value:''},
            ]
        })
    }
    async search(username:string){
        
    }
    usernameInputKeyHandle:React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.code === "Enter") {
            
            if (e.currentTarget.value && e.currentTarget.value.indexOf("\\") == -1 && e.currentTarget.value.indexOf("/") == -1) {
                this.search(e.currentTarget.value)
            }
        }
    }
    override render(){
        return (
            <div id="search">
                <p>Replay</p>
                <button id="replay">▶</button>

                <input type="text" id="usernameInput" placeholder="유저명(소문자로 입력해주세요.)" onKeyUp={this.usernameInputKeyHandle}/>
                <button id="submit">검색</button>
                {/* 유저 정보 */}
                <div id="username">{this.props.username}</div>
                <div id="level">{this.props.level}</div>
                <img id="rank_image" src={this.props.rank_image} />

                {/* 통산 전적, 최근 전적 */}
                {this.props.record.map(v => <div className={v.class}>{v.value}</div>)}

                {/* 기록 */}
                <div id="records">
                    <table id="recordTable">
                    </table>
                </div>

                {/* 전적 display */}
                <div id="history">{this.props.history}</div>
            </div>
        )
    }
}

export default Search;