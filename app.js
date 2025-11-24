class CountdownManager {
init() {
    this.newCountdownBtn = document.getElementById("new-countdown");
    this.eventTitle = document.getElementById("event-title");
    this.datePicker = document.getElementById("date-picker");

    this.countdownCounter = 0;

    this.countdownsContainer = document.querySelector(".countdowns-container");
    this.countdowns = [];

    this.disableTickerPastDate();
    this.addListeners();
}

disableTickerPastDate = () => {
    let currentDate = new Date().toISOString();
    currentDate = currentDate.slice(0, currentDate.lastIndexOf(":"));
    this.datePicker.setAttribute("min", currentDate);
    this.datePicker.setAttribute("value", currentDate);
}

addListeners = () => {
    this.newCountdownBtn.addEventListener("click", ()=> {
        const dateStr = this.datePicker.value;
        const eventTitle = this.eventTitle.value;

        if (dateStr === "" || eventTitle === "") return;

        this.addNewCountdown({
            title: eventTitle,
            date: new Date(dateStr),
            container: this.countdownsContainer
        });
    });
}
addNewCountdown = ({title, date, container}) => {
const countdownId = "countdown" + this.countdownCounter++;

const code = `<div class="countdown" id="${countdownId}">
    <h3 class="countdown-title">${title}</h3>
    <div class="countdown-body">
        <ul class="timer">
            <li><span class="days"></span>Dni</li>
            <li><span class="hours"></span>Godzin</li>
            <li><span class="minutes"></span>Minut</li>
            <li><span class="seconds"></span>Sekund</li>
        </ul>
        <div class="countdown-finished-info">Odliczanie zakończone!</div>
        <button class="countdown-delete">X</button>
    </div>
</div>`;

let element = document.createElement("div");
element.innerHTML = code;
element = element.firstChild;
container.appendChild(element);

const countdown = new Countdown({
    title: title, date: date,
    id: countdownId
});

countdown.addDeleteListener(() => {
this.removeCountdownFromHtml(countdown);
});

this.countdowns.push(countdown);
}

removeCountdownFromHtml = (c) => {

}

}

const countdownManager = new CountdownManager();
countdownManager.init();