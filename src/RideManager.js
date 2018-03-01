class RideManager {
    constructor(rides) {
        this.rides = rides;
    }

    setRides(rides) {
        this.rides = rides;
    }

    requestRide(car, time) {
        let closestRide = null;
        let closestDistance = Number.MAX_VALUE;
        let closestIndex = null;

        for (let i = 0; i < this.rides.length; i++) {
            const ride = this.rides[i];

            const toStartDistance = ride.start.distance(car.position);
            const timeToStart = Math.max(ride.startTime - time, 0);
            let score = toStartDistance + Math.abs(timeToStart - toStartDistance);

            if (!this.canBeFinished(car, ride, time, toStartDistance, timeToStart)) {
                score = Number.MAX_VALUE - 1;
            }

            if (score < closestDistance) {
                closestRide = ride;
                closestDistance = score;
                closestIndex = i;
            }
        }

        if (closestIndex !== null) {
            this.rides.splice(closestIndex, 1);
        }

        return closestRide;
    }

    canBeFinished(car, ride, time, toStartDistance, timeToStart) {
        const distance = Math.abs(toStartDistance - timeToStart) + ride.distance;
        const timeLeft = ride.endTime - time;

        return distance <= timeLeft;
    }
}

module.exports = RideManager;