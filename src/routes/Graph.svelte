<script>
    import { Line } from "svelte-chartjs";

    export var threshold = 25;

    export var xaxis = [];
    export var yaxis = [];
    export var label = "Temperature";
    // $: latest = yaxis[yaxis.length - 1];
    // $: latest = 234;

    $: threshold_data = [...Array(yaxis.length)].map((x, i) => threshold);

    $: data = {
        labels: xaxis,
        datasets: [
            {
                label: label,
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(225, 204,230, .3)",
                borderColor: "rgb(205, 130, 158)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(205, 130,1 58)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: yaxis,
            },
            {
                label: "Threshold",
                fill: true,
                lineTension: 0.3,
                backgroundColor: "rgba(225, 204,230, .3)",
                borderColor: "rgb(255, 20, 0)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "rgb(205, 130,1 58)",
                pointBackgroundColor: "rgb(255, 255, 255)",
                pointBorderWidth: 4,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgb(0, 0, 0)",
                pointHoverBorderColor: "rgba(220, 220, 220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 0,
                data: threshold_data,
            },
        ],
    };

    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    } from "chart.js";

    ChartJS.register(
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
    );
</script>

<!-- <p>Your current temp is {Math.round(latest * 100) / 100}.</p> -->

<Line
    {data}
    options={{ responsive: true, animation: { duration: 0 }, aspectRatio: 1.5 }}
/>
