console.log('starting app');

setTimeout(() => {
  console.log('Inside of callback');
}, 2000);

setTimeout(() => {
  console.log('second timeout func');
}, 0);

console.log('Finishing up');

// Google MAps API key AIzaSyAeJbT73ajsPMRC6-dBovP59qlm5UX5xCk
