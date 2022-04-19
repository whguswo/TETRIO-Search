interface Cache{
    status:'hit'|'miss'|'awaited';
    cached_at:number;
    cached_until:number;
}

export interface RecordAJAXData{
    success:boolean;
    error?:string;
    cache?:Cache;
    data?:{
        user:{
            _id:string;
            username:string;
            role:'anon'|'user'|'bot'|'mod'|'admin';
            ts?:string;
            botmaster?:string;
            badges:{ id:string; label:string; ts?:string }[];
            xp:number;
            gamesplayed: number;
            gameswon: number;
            gametime: number;
            country: string;
            badstanding?:boolean;
            supporter: boolean;
            supporter_tier: 0|1|2|3|4;
            verified: boolean;
            league:{
                gamesplayed: number;
                gameswon: number;
                rating: number;
                rank:string;
                standing:number;
                standing_local:number;
                next_rank:string|null;
                prev_rank:string|null;
                next_at:number;
                prev_at:number;
                percentile:number;
                percentile_rank:string;
                glicko?:number;
                rd?:number;
                apm?:number;
                pps?:number;
                vs?:number;
                decaying:boolean;
            }
            avatar_revision?:number;
            banner_revision?:number;
            bio?:string;
            friend_count:number;
        }
    }
}

interface StreamEndcontext{
    naturalorder: number,
    user: {
        _id: string;
        username: string;
    };
    active: boolean;
    wins: number;
    points: {
        primary: number;
        secondary: number;
        tertiary: number;
        extra: {
            vs: number;
        };
        secondaryAvgTracking: number[];
        tertiaryAvgTracking: number[];
        extraAvgTracking: {
            aggregatestats___vsscore: number[];
        }
    };
    inputs: number;
    piecesplaced: number;
}

interface RecordEndcontext{
    score:number;
    finalTime:number;
}


export interface StreamRecordAJAXData<T extends 'stream'|'record'>{
    _id:string;
    stream:string;
    replayid:string;
    user:{
        _id:string;
        username:string;
    }
    ts:string;
    ismulti?:boolean;
    endcontext:T extends 'stream' ? StreamEndcontext[] : RecordEndcontext;
}

export interface StreamAJAXData{
    success:boolean;
    error?:string;
    cache?:Cache;
    data?:{
        records:StreamRecordAJAXData<'stream'>[];
    }
}

export interface UserRecordAJAXData{
    success:boolean;
    error?:string;
    cache?:Cache;
    data?:{
        records:{
            "40l":{
                record:StreamRecordAJAXData<'record'>;
                rank:number;
            };
            blitz:{
                record:StreamRecordAJAXData<'record'>;
                rank:number;
            }
        };
        zen:{
            level:number;
            score:number;
        }
    }
}