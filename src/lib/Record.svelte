<!-- 통산 전적 -->
<script lang="ts">
    export let total_win: string;
    export let total_lose: string;
    export let win_rate: string;
    export let recent_win: string;
    export let recent_lose: string;
</script>

<div class="WL">통산 전적</div>
<div class="WL wins">{total_win}</div>
<div class="WL loses">{total_lose}</div>
<div class="WL">{win_rate}</div>
<br />
<div class="WL">최근 전적</div>
<div class="WL wins">{recent_win}</div>
<div class="WL loses">{recent_lose}</div>

<style>
    .wins {
        color: #4287f5;
    }

    .loses {
        color: #f54248;
    }

    .WL {
        font-size: 15px;
        display: inline;
    }
</style>
