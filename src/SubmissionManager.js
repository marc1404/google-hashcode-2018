const fs = require('fs');

class SubmissionManager {
    constructor() {
        this.schedule = {};
    }

    record(car, ride) {
        if (!this.schedule[car.id]) {
            this.schedule[car.id] = [];
        }

        this.schedule[car.id].push(ride.id);
    }

    make(name) {
        const ridesPerCar = Object.values(this.schedule);
        const lines = ridesPerCar.map(rides => {
            return `${rides.length} ` + rides.join(' ');
        });

        const text = lines.join('\n');

        fs.writeFileSync(`submission/${name}.txt`, text, { encoding: 'utf8' });
    }
}

module.exports = SubmissionManager;