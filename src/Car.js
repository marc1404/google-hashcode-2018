const Position = require('./Position');

class Car {
    constructor(id, rideManager, submissionManager) {
        this.id = id;
        this.rideManager = rideManager;
        this.submissionManager = submissionManager;
        this.position = new Position(0, 0);
        this.ride = null;
        this.toStartDistance = 0;
    }

    update(time) {
        if (!this.ride) {
            this.ride = this.requestRide(time);
        }

        if (!this.ride) {
            return;
        }

        if (this.toStartDistance) {
            this.toStartDistance--;
            return;
        }

        if (time < this.ride.startTime) {
            return;
        }

        if (this.toEndDistance) {
            this.toEndDistance--;
            return;
        }

        this.position = this.ride.end;
        this.ride = null;
    }

    requestRide(time) {
        const ride = this.rideManager.requestRide(this, time);

        if (!ride) {
            return null;
        }

        this.toStartDistance = this.position.distance(ride.start);
        this.toEndDistance = ride.start.distance(ride.end);

        this.submissionManager.record(this, ride);

        return ride;
    }
}

module.exports = Car;