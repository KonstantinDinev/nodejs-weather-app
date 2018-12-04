var asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      }
      else {
        reject('Args must be nums!');
      }
    }, 2000);
  });
};

// removing error handlers (reject)
// will let me use .catch promise

asyncAdd(5, 7).then((res) => {
  console.log('Result: ', res);
  // chaining promises
  return asyncAdd(res, 33);
}).then((res) => {
  console.log('should be 45 = ', res);
}).catch((errorMessage) => {
  console.log(errorMessage);
});

var somePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('2nd promise');
    // only resolve or reject could be exectured at once
    resolve('Worked');
    reject('enable to fulfill promise');
  }, 2500);

});

// calls only if the promise has been fulfield
somePromise.then((message) => {
  console.log('Success: ', message);
}, (errorMessage) => {
  console.log('Error: ', errorMessage);
});
