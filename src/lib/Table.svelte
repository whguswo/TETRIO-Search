<script lang="ts">
    export let finalTime:string;
    export let blitzScore:string;
</script>

<!-- 기록 -->
<div id="records">
    <table id="recordTable">
        <tbody>
            <tr>
                <td>40 Lines</td>
                <td>Blitz</td>
            </tr>
            <tr>
                <td>{finalTime}</td>
                <td>{blitzScore}</td>
            </tr>
        </tbody>
    </table>
</div>

<style>
    #records {
        position: absolute;
        /* background-color: aquamarine;     */
        top: 180px;
        /* left: 280px; */
        right: 15px;
        width: 300px;
        height: 100px;
    }

    #recordTable {
        border: 2px solid black;
        border-collapse: collapse;
    }

    td {
        font-size: 20px;
        text-align: center;
        width: 150px;
        height: 50px;
        border: 2px solid black;
    }

    td:nth-child(odd) {
        background-color: #e6f1ff;
    }

    td:nth-child(even) {
        background-color: #f0f7ff;
    }
</style>