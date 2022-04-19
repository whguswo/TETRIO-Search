let originUrl = 'https://ch.tetr.io';
// const html = document.querySelector('html');
if(import.meta?.env){
    if(import.meta.env.MODE === 'development'){
        originUrl = '';
    }
}

export const XPtoLevel = (xp:number) => 
    Math.floor(Math.pow(xp / 500, 0.6) + (xp / (5000 + Math.max(0, xp - 4000000) / 5000)) + 1);

export const getStream = async (streamID:string) => {
    const result = await fetch(`${originUrl}/api/streams/league_userrecent_${encodeURIComponent(streamID)}`);
    return await result.json();
};

export const getRecord = async (user:string) => {
    const result = await fetch(`${originUrl}/api/users/${user}/records`);
    return await result.json();
};

export const parseMS = (oms:number) => {
    const roms = Math.round(oms);

    const ms = (roms % 1000).toString().padStart(3, '0');
    const s = (Math.floor(roms / 1000) % 60).toString().padStart(2, '0');
    const m = Math.floor(roms / 60000).toString();

    return { ms, s, m };
};

export const getJson = async (username:string) => {
    const result = await fetch(`${originUrl}/api/users/${username}`);
    return await result.json();
};
