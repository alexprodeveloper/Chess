export class Timer {
    constructor(time, timeAdd, selector) {
        this.time = time;
        this.timeAdd = timeAdd;
        this.selector = selector;
    }

    start() {
        let that = this;
        that.interval = setInterval(function() {
            that.time--;
            let format = that.timeFormate();
            document.querySelector(that.selector).textContent = format;
            if (that.time === 0) {
                clearInterval(that.interval);
            }
        }, 1000);   
    }

    stop() {
        clearInterval(this.interval);
        this.add();
    }

    add() {
        if (this.timeAdd > 0) {
            this.time += this.timeAdd;
            let format = this.timeFormate();
            document.querySelector(this.selector).textContent = format;
        }
    }

    timeFormate() {
        let result = '';
        let hours = Math.floor(this.time / 3600);
        let minutes = Math.floor((this.time - hours * 3600) / 60);
        let seconds = (this.time - minutes * 60 - hours * 3600) % 60;
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        if (minutes < 10 && hours > 0) {
            minutes = '0' + minutes;
        }
        result = (hours > 0) ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds;
        return result;
    }
}