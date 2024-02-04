import { writable } from "svelte/store";

export const temperature = writable([]);
export const pressure = writable([]);
export const time = writable([]);

function fmt(t) {
    var date = new Date(t * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

    return formattedTime;
}

export function update() {
    fetch("http://127.0.0.1:5000/get/temperature")
        .then((resp) => resp.json())
        .then((json) => {
            const temp = json["temperature"].map((v, i) => v / 100);
            const date = json["time"].map((v, _) => fmt(v));

            temperature.set(temp);
            time.set(date);
        });

    fetch("http://127.0.0.1:5000/get/pressure")
        .then((resp) => resp.json())
        .then((json) => {
            const pres = json["pressure"];
            pressure.set(pres);
        });
}

// initial data
update();
setInterval(update, 250);