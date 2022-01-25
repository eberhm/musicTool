process = require('process');
Pendulum = require('pendulum').Pendulum;

const notes = ["A", "B", "C", "D", "E", "F", "G"];

const notesWindowSize = parseInt(process.argv[3] || 3);
const bpm = parseInt(process.argv[2] || 35);

const notesStream = getRandomNotes(notesWindowSize);

const metronome = new Pendulum(bpm);

metronome.on('tick', () => {
    printScreen();
    prepareNextNote();
});

process.on('SIGINT', function() {
    metronome.stop();
});

metronome.start();

function printScreen() {
        console.log("\007");
        console.clear();
        console.log(`BPM: ${bpm}`);
        console.log(notesStream.join(' - '));
}

function prepareNextNote() {
    notesStream.shift();
    notesStream.push(getRandomNotes(1).pop());
}

function getRandomNotes(numNotes) {
    return ([...Array(numNotes).keys()]).map(
        () => notes[notes.length * Math.random() | 0]);
}

