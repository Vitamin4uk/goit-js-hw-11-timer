class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.targetDate = targetDate;
    this.intervalId = null;
    this.isActive = false;
    this.refs = {
      daysCell: document.querySelector(`${selector} [data-value="days"]`),
      hoursCell: document.querySelector(`${selector} [data-value="hours"]`),
      minsCell: document.querySelector(`${selector} [data-value="mins"]`),
      secsCell: document.querySelector(`${selector} [data-value="secs"]`),
    };
    this.start();
  }

  getRemainingTime() {
    const targetTime = this.targetDate.getTime();
    const currentTime = Date.now();
    return targetTime - currentTime;
  }

  start() {
    if (this.isActive) {
      return;
    }

    const remainingTime = this.getRemainingTime();
    if (remainingTime <= 0) {
      this.updateTimerView({ days: '00', hours: '00', mins: '00', secs: '00' });
    } else {
      this.updateTimerView(this.getTimeComponents(remainingTime));
    }

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const remainingTime = this.getRemainingTime();
      if (remainingTime > 0) {
        this.updateTimerView(this.getTimeComponents(remainingTime));
      } else {
        this.stop();
      }
    }, 1000);
  }

  stop() {
    this.isActive = false;
    clearInterval(this.intervalId);
  }

  updateTimerView({ days, hours, mins, secs }) {
    this.refs.daysCell.textContent = days;
    this.refs.hoursCell.textContent = hours;
    this.refs.minsCell.textContent = mins;
    this.refs.secsCell.textContent = secs;
  }

  pad(value) {
    return value.toString().padStart(2, '0');
  }

  getTimeComponents(time) {
    /*
     * Оставшиеся дни: делим значение UTC на 1000 * 60 * 60 * 24, количество
     * миллисекунд в одном дне (миллисекунды * секунды * минуты * часы)
     */
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
}

const timer1 = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('September 03, 2021'),
});

console.log('timer1 - until September 03, 2021');

const timer2 = new CountdownTimer({
  selector: '#timer-2',
  targetDate: new Date('Nov 29, 2021'),
});

console.log('timer2 - until November 29, 2021');
