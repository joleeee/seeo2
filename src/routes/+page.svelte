<script>
	import Graph from "./Graph.svelte";
	import Counter from "./Counter.svelte";
	import { temperature, pressure, time } from "./data.js";

	temperature.subscribe((x) => (temp = x));
	time.subscribe((x) => (horizontal = x));
	pressure.subscribe((x) => (press = x));

	var t = 27;

	var temp = [];
	var press = [];
	var horizontal = [];

	$: last_temperature = temp && temp[temp.length - 1];

	$: dead = last_temperature >= t;

	$: {
		if(dead) {
			console.log("NOTIF")
			new Notification("Dårlig luftkvalitet, åpne et vindu!");
		}
	}

	$: {
		if(last_temperature >= t) {
			console.log("dead")
			audio.play();
		}
	}

	var audio;
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		<span class="welcome">
			Status: You are {dead ? "Dead" : "Alive"}!
		</span>
	</h1>

	<Counter bind:count={t} />

	<h3>
		Your temp is {last_temperature}
	</h3>

	<Graph
		label={"Temperature"}
		bind:threshold={t}
		bind:yaxis={temp}
		bind:xaxis={horizontal}
	/>
	<Graph
		label={"Pressure"}
		threshold={null}
		bind:yaxis={press}
		bind:xaxis={horizontal}
	/>
</section>

<audio src="/notif.mp3" bind:this={audio}>
</audio>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
	}

	.welcome {
		display: block;
		position: relative;
		width: 100%;
		height: 0;
		/* padding: 0 0 calc(100% * 495 / 2048) 0; */
	}
</style>
