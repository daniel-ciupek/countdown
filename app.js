class CountdownManager {
init() {
    this.newCountdownBtn = document.getElementById("new-countdown");
    this.eventTitle = document.getElementById("event-title");
    this.datePicker = document.getElementById("date-picker");

    this.countdownCounter = 0;

    this.countdownsContainer = document.querySelector(".countdowns-container");

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

}

}

const countdownManager = new CountdownManager();
countdownManager.init();