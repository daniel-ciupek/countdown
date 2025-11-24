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
    this.startCountdowns();
  }

  disableTickerPastDate() {
    const now = new Date();
    now.setSeconds(0);
    now.setMilliseconds(0);
    now.setMinutes(now.getMinutes() + 1);
    const offset = now.getTimezoneOffset() * 60000;
    const localISO = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    this.datePicker.min = localISO;
    this.datePicker.value = localISO;

    this.datePicker.addEventListener("input", () => {
      const value = this.datePicker.value;
      if (!value) return;

      const dt = new Date(value);
      const now = new Date();

      if (dt.getHours() === 0 && dt.getMinutes() === 0) {
        alert("Godzina 00:00 jest niedostępna. Wybierz inną godzinę.");
        this.datePicker.value = "";
        return;
      }

      if (dt <= now) {
        alert("Nie można wybrać czasu, który już minął. Wybierz czas z przyszłości.");
        this.datePicker.value = "";
        return;
      }
    });
  }

  addListeners() {
    this.newCountdownBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const dateStr = this.datePicker.value;
      const eventTitle = this.eventTitle.value.trim();
      if (!dateStr || !eventTitle) return;

      const selectedDate = new Date(dateStr);
      const now = new Date();

      if (selectedDate.getHours() === 0 && selectedDate.getMinutes() === 0) {
        alert("Godzina 00:00 jest niedostępna. Wybierz inną godzinę.");
        return;
      }

      if (selectedDate <= now) {
        alert("Nie możesz dodać wydarzenia z przeszłości. Ustaw czas przyszły.");
        return;
      }

      this.addNewCountdown({
        title: eventTitle,
        date: selectedDate,
        container: this.countdownsContainer,
      });

      this.eventTitle.value = "";
      this.datePicker.value = "";
    });
  }

  addNewCountdown({ title, date, container }) {
    const countdownId = "countdown" + this.countdownCounter++;
    const isFuture = date.getTime() > new Date().getTime();

    const initialClass = isFuture ? "truncated" : "truncated countdown-finished";
    const initialDisplay = isFuture ? "display: block;" : "display: none;";
    const timerHideClass = isFuture ? "" : "hide";
    const finishedShowClass = isFuture ? "" : "show";

    const code = `<div class="countdown" id="${countdownId}" data-is-finished="${!isFuture}">
      <h3 class="countdown-title ${initialClass}">${title}</h3>
      <span class="countdown-title-toggle" style="${initialDisplay}">...więcej</span>
      <div class="countdown-body">
          <ul class="timer ${timerHideClass}">
              <li><span class="days"></span>Dni</li>
              <li><span class="hours"></span>Godzin</li>
              <li><span class="minutes"></span>Minut</li>
              <li><span class="seconds"></span>Sekund</li>
          </ul>
          <div class="countdown-finished-info ${finishedShowClass}">Odliczanie zakończone!</div>
          <button class="countdown-delete">X</button>
      </div>
    </div>`;

    let element = document.createElement("div");
    element.innerHTML = code;
    element = element.firstChild;
    container.appendChild(element);

    const countdown = new Countdown({ title, date, id: countdownId });
    countdown.addDeleteListener(() => {
      this.removeCountdownFromHtml(countdown);
    });

    if (!isFuture) countdown.finished = true;

    this.countdowns.push(countdown);
  }

  startCountdowns() {
    this.intervalId = setInterval(this.checkCountdowns, 1000);
  }

  checkCountdowns = () => {
    const now = new Date().getTime();
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    this.countdowns.forEach((c) => {
      if (c.finished) return;

      const distance = c.timestamp - now;

      if (distance > 0) {
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        c.updateCountdownHtml(days, hours, minutes, seconds);
      } else {
        c.updateCountdownHtml(0, 0, 0, 0);
        c.countdownFinished();
      }
    });
  };

  removeCountdownFromHtml(c) {
    const countdownId = c.getId();
    const countdownContainer = c.getContainer();
    this.countdownsContainer.removeChild(countdownContainer);
    this.countdowns = this.countdowns.filter((x) => x.id != countdownId);
    c.destroyCountdown();
  }
}

const countdownManager = new CountdownManager();
countdownManager.init();
