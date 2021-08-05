export class Timer {
    constructor(time, timeAdd) {
        this.time = time;
        this.timeAdd = timeAdd;
        this.stopInterval = false;
    }

    start() {
        let interval = setInterval(function() {
            this.time--;
            if (time === 0 || this.stopInterval) {
                clearInterval(interval);
            }
        }, 1000);
        
    }

    stop() {
        this.stopInterval = true;
    }
}
//     add() {
//         if (this.timeAdd > 0) {
//             this.time += this.timeAdd;
//         }
//     }

//     timeToMinutes() {
//         let result = '';
//         let minutes = Math.floor(this.time / 60);
//         let seconds = this.time % 60;
//         result = minutes + '' + seconds;
//         return parseInt(result, 10);
//     }
// }