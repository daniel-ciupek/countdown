class Countdown {
    constructor({title, date, id}) {
        this.title = title;
        this.date = date;
        this.timestamp = date.getTime();
        this.id = id;
        this.finished = false;

        this.container = document.getElementById(id);

        this.daysEl = this.container.querySelector(".days");
        this.hoursEl = this.container.querySelector(".hours");
        this.minutesEl = this.container.querySelector(".minutes");
        this.secondsEl = this.container.querySelector(".seconds");

        this.deleteBtnEl = this.container.querySelector(".countdown-delete");

    }

    addDeleteListener = (callback) => {
        this.deleteBtnEl.addEventListener("click", callback);
    }

    updateCountdownHtml = (d, h, m, s) => {
        this.daysEl.textContent = d;
        this.hoursEl.textContent = h;
        this.minutesEl.textContent = m;
        this.secondsEl.textContent = s;
    }

    countdownFinished = () => {
        if (this.finished) return;
        this.finished = true;

        this.container.classList.add("countdown-finished");
        this.container.querySelector(".timer").classList.add("hide");
        this.container.querySelector(".countdown-finished-info").classList.add("show");
        console.log(`Countdown: ${this.id} finished.`);
    }

    getId = () => {
        return this.id;
    }

    getContainer = () => {
        return this.container;
    }

    destroyCountdown = () => {
        
    }
}