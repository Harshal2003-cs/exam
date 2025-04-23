// main.js
const EventEmitter = require('events');

// Create a custom event emitter class
class MyEmitter extends EventEmitter {}

// Create an instance of the custom event emitter
const myEmitter = new MyEmitter();

// Define a callback function for the 'greet' event
myEmitter.on('greet', (name) => {
  console.log(`Hello, ${name}!`);
});

// Define a callback function for the 'exit' event
myEmitter.on('exit', () => {
  console.log('Goodbye!');
  process.exit(); // Exit the application
});

// Main loop to listen for user input
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log('Event-driven application started. Type "greet <name>" or "exit" to trigger events.');

rl.on('line', (input) => {
  const [command, ...args] = input.split(' ');

  if (command === 'greet') {
    const name = args.join(' ');
    if (name) {
      myEmitter.emit('greet', name); // Emit the 'greet' event
    } else {
      console.log('Please provide a name.');
    }
  } else if (command === 'exit') {
    myEmitter.emit('exit'); // Emit the 'exit' event
  } else {
    console.log('Unknown command. Try "greet <name>" or "exit".');
  }
});