class World {
    constructor(vehicles, totalSteps) {
        this.vehicles = vehicles;
        this.totalSteps = totalSteps;
    }

    start() {
        for (let time = 0; time < this.totalSteps; time++) {
            this.update(time);
        }
    }

    update(time) {
        for (const car of this.vehicles) {
            car.update(time);
        }
    }
}

module.exports = World;