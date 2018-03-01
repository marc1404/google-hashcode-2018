const fs = require('fs');
const splitLines = require('split-lines');

const World = require('./World');
const Car = require('./Car');
const Ride = require('./Ride');
const Position = require('./Position');
const RideManager = require('./RideManager');
const SubmissionManager = require('./SubmissionManager');

const files = [
    'a_example.in',
    'b_should_be_easy.in',
    'c_no_hurry.in',
    'd_metropolis.in',
    'e_high_bonus.in'
];

for (const file of files) {
    console.log(`Running ${file}...`);
    runSimulation(file);
    console.log(`Finished ${file}!`);
}

function runSimulation(file) {
    const text = fs.readFileSync(`data/${file}`, { encoding: 'utf8'});
    const lines = splitLines(text);
    let [rows, columns, vehicleCount, rideCount, bonus, steps] = lines[0].split(' ');

    vehicleCount = Number.parseInt(vehicleCount, 10);
    steps = Number.parseInt(steps, 10);

    const vehicles = [];
    const rides = [];

    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];

        if (!line) {
            continue;
        }

        let [startRow, startColumn, endRow, endColumn, startTime, endTime] = line.split(' ');
        startRow = Number.parseInt(startRow, 10);
        startColumn = Number.parseInt(startColumn, 10);
        endRow = Number.parseInt(endRow, 10);
        endColumn = Number.parseInt(endColumn, 10);
        startTime = Number.parseInt(startTime, 10);
        endTime = Number.parseInt(endTime, 10);
        const id = i - 1;
        const start = new Position(startRow, startColumn);
        const end = new Position(endRow, endColumn);
        const ride = new Ride(id, start, end, startTime, endTime);

        rides.push(ride);
    }

    const rideManager = new RideManager(rides);
    const submissionManager = new SubmissionManager();

    for (let i = 0; i < vehicleCount; i++) {
        const car = new Car(i, rideManager, submissionManager);

        vehicles.push(car);
    }

    const world = new World(vehicles, steps);

    rideManager.setRides(rides);
    world.start();
    submissionManager.make(file);
}