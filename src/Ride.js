class Ride {
    constructor(id, start, end, startTime, endTime) {
        this.id = id;
        this.start = start;
        this.end = end;
        this.startTime = startTime;
        this.endTime = endTime;
        this.distance = start.distance(end);
    }
}

module.exports = Ride;