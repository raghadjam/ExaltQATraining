/* TASK 1

This is a function that simulates an API call:
Returns a Promise that resolves after 2 seconds with: { id, name: "Raghad" }
Rejects with an error if userId is not a number. 

function getUserData(userID) {
    return new Promise((resolve, reject) => {
        if(typeof(userID) === "number") {
            setTimeout(() => {
                resolve(`{ ${userID}, name: "Raghad"}`)} , 2000)
        }
        else {
            reject("User ID should be a number.")
            }
    }
)}

getUserData(1220212)
    .then((message) => {console.log(message)})
    .catch((message) => {console.log(message)})

OUTPUT:
when input is "1220212" -> User ID should be a number.
when input is 1220212 -> { 1220212, name: "Raghad"} */

//---------------------------------------------------------------------------------------

/* TASK 2 

function fetchUser() {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`"User fetched"`)} , 2000)
    }
)}

function fetchOrders() {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`"Orders fetched"`)} , 3000)
    }
)}

async function runSequential(){
    console.time('sequential');
    const user = await fetchUser()
    const orders = await fetchOrders()
    console.timeEnd('sequential');
    return [user, orders]
}

async function runParallel() {
    console.time('parallel');
    const result = await Promise.all([
        fetchUser(),
        fetchOrders()
    ]);
    console.timeEnd('parallel');
    return result;
}

async function resultsWithTime() {
    const seq = await runSequential()
    console.log(seq)
    const parallel = await runParallel()
    console.log(parallel)
}

resultsWithTime() /* runParallel takes about 3sec and runSequential takes about
                     5sec, runParallel is faster since it runs the function calls in parallel 
                     and does not wait on each of them indivisually making it more efficent. 
                     In Automation runParallel would be better since it simulates the users behaviour more
                     accurately 
OUTPUT:
sequential: 5.010s
[ '"User fetched"', '"Orders fetched"' ]
parallel: 3.002s
[ '"User fetched"', '"Orders fetched"' ] */

//------------------------------------------------------------------------------

/* TASK 3 
function fetchWithRetry(fn, retries, delay){
    return new Promise((resolve, reject) => {
        let attempt = 1 
        let i = retries
        let lasterror                               // to reject using the last error
        let promise = fn() 
        .then((message) => {
            console.log(`Attempt ${attempt}: ` + message)
            resolve(message)
        })
        .catch((message) => {
            lasterror = message
            if(delay){
                const intr = setInterval(() => {
                    fn()
                    .then((message) => {
                        console.log(`Attempt ${attempt}: ` + message)
                        clearInterval(intr)
                        resolve(message)
                    })
                    .catch((message) => {
                        lasterror = message
                        if(i >= 1){
                            console.log(`Attempt ${attempt}: ` + message)
                            i--
                            attempt++
                        }
                        else {
                            clearInterval(intr)
                            reject(lasterror)
                        }
                    })
                }, delay)
            }
            else {
                    while (retries >= 1 ){
                         fn()
                        .then((message) => {
                            console.log(`Attempt ${attempt}: ` + message)
                            resolve(message)
                            retries = 0 
                        })
                        .catch((message) => {
                            lasterror = message
                            console.log(`Attempt ${attempt}: ` + message)
                        })
                        retries--
                        attempt++
                    }
                    reject(lasterror);
                }
        })
    })
}

function fn(){
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve('Operation completed successfully');
        } 
        else {
            reject(('Operation failed'));
        }
})}

fetchWithRetry(fn, 5, 2000)
  .then(res => console.log(res))
  .catch(err => console.log(err));

OUTPUT:
Attempt 1: Operation failed
Attempt 2: Operation failed
Attempt 3: Operation completed successfully
Operation completed successfully

ANOTHER CASE:
Attempt 1: Operation failed
Attempt 2: Operation failed
Attempt 3: Operation failed
Attempt 4: Operation failed
Attempt 5: Operation failed
Operation failed */

//-------------------------------------------------------------------------------------

/* TASK 4 

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
        resolve(`2 seconds delay.`)} , ms);
    })
}

async function example() {
  console.log("Start");
  await delay(2000).then(message => console.log(message)); 
  console.log("Finish");
}

example();

OUTPUT:
Start
2 seconds delay.
Finish */

//----------------------------------------------------------------------------------

/* TASK 5 

async function login() {
  for (let i = 0; i < 3; i++) {
    const delayTime = (i + 1) * 1000;

    await new Promise(resolve => setTimeout(resolve, delayTime));
    if(!notAborting) break 
    const success = Math.random() > 0.5;

    if (success) {
      console.log(`${new Date().toLocaleString()} Login Attempt ${i + 1}: Successful`);
      return "Login successful";
    } else {
      console.log(`${new Date().toLocaleString()} Login Attempt ${i + 1}: Failed`);
    }
  }
  throw "Login failed since all attempts failed";
}

async function clickButton() {
    let i = 0
    let consecutiveFails = 0
    while(true){
        await new Promise(resolve => setTimeout(resolve, 2000));
        if(!notAborting) break 
        const success = Math.random() > 0.5;

        if (success) {
            console.log(`${new Date().toLocaleString()} Click Button Attempt ${i + 1}: Successful`);
            consecutiveFails = 0
            return "Click Button successful";
        } else {
            console.log(`${new Date().toLocaleString()} Click Button Attempt ${i + 1}: Failed`);
            consecutiveFails++
        }
        if(consecutiveFails == 2){
            throw "Aborting click button due to two consecutive fails.";
        }
        i++
    }
}

async function verifyDashboard() {
    for (let i = 0; i < 2; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if(!notAborting) break 
    const dashboardReady = Math.random() > 0.5;

    if (dashboardReady) {
      console.log(`${new Date().toLocaleString()} Dashboard Attempt ${i + 1}: Successful`);
      return "Dashboard successful";
    } else {
      console.log(`${new Date().toLocaleString()} Dashboard Attempt ${i + 1}: Failed`);
    }
  }
  throw "Dashboard failed";
}

let notAborting = 1

async function runSequential() {
        try {
            const success = await login();
            console.log(success)
        } catch (fail) {
            console.error(fail);
        }

        if(notAborting){
            try {
                const success = await clickButton();
                console.log(success)
            } catch (fail) {
                console.error(fail);
            }
            if (notAborting){
                try {
                    const success = await verifyDashboard();
                    console.log(success)
                } catch (fail) {
                    console.error(fail);
            }
        }
    }    
}

const timeout = Promise.race([
  runSequential(),
  new Promise((resolve, reject) => {
    setTimeout(() => {
        notAborting = 0
        reject("Aborting due to exceeding 8 seconds")}, 8000);
  }),
])

timeout
.then(() => console.log("Flow completed within 8 seconds"))
.catch((error) => console.log(error));

OUTPUT:
7/22/2025, 3:02:26 PM Login Attempt 1: Successful
Login successful
7/22/2025, 3:02:28 PM Click Button Attempt 1: Failed
7/22/2025, 3:02:30 PM Click Button Attempt 2: Failed
Aborting click button due to two consecutive fails.
7/22/2025, 3:02:31 PM Dashboard Attempt 1: Failed
7/22/2025, 3:02:32 PM Dashboard Attempt 2: Successful
Dashboard successful
Flow completed within 8 seconds

ANOTHER OUPUT:
7/22/2025, 3:07:59 PM Login Attempt 1: Failed
7/22/2025, 3:08:01 PM Login Attempt 2: Successful
Login successful
7/22/2025, 3:08:03 PM Click Button Attempt 1: Failed
7/22/2025, 3:08:05 PM Click Button Attempt 2: Failed
Aborting click button due to two consecutive fails.
Aborting due to exceeding 8 seconds
Dashboard failed */

//--------------------------------------------------------------------------------------

/* TASK 6 

function createCounter(initialValue = 0, step = 1) {  
  let counter = initialValue
  return {
    increment: function () {
      counter += step
      console.log(counter)
    },
    decrement: function() {
      if (counter - step >= 0){
        counter = counter - step
        console.log(counter) }
      else{
        counter = 0
      }},
    reset: function() {
      counter = initialValue
      console.log(counter)
    }
  };
}

const counter = createCounter(2,1)
counter.increment()
counter.increment()
counter.reset()
counter.decrement()
console.log(counter.counter)

OUTPUT:
3
4
2
1
undefined

This enables encapsulation and privacy since we can't directly access the counter variable */

//-------------------------------------------------------------------------------------

/* TASK 7 

function createRetryWrapper(fn, maxTries) {
  return async function() {
    let attempts = 0
    while (attempts < maxTries) {
        attempts++
        const success = Math.random() > 0.5   //simulates the flaky network behaviour 
        if(success){
            try {
                const result = await fn();
                console.log(`Attempt ${attempts}: Success`)
                return result
            } catch (error) {
                console.error(`Attempt ${attempts}: function fail`)
            }
        }
        else {
            console.log(`Attempt ${attempts}: Network failure`);
        }}
    throw new Error("All attempts failed")
  }
}

async function fn() {
    return new Promise((resolve, reject) => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve('Operation completed successfully');
        } 
        else {
            reject(('Operation failed'));
        }
})}

const retry = createRetryWrapper(fn, 5)

retry()
.then(console.log)
.catch((error) => {
  console.error(error.message);
})

OUTPUT:
Network failure
Attempt 2: function fail
Attempt 3: Success
Operation completed successfully */

//-------------------------------------------------------------------------------------

/* TASK 8 
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");

OUTPUT: 
A
D
C
B

Since sync code runs first then the microtask (promise) and lastly the timer
*/

//-------------------------------------------------------------------------------------

/* TASK 9 
function isValidEmail(email){
    const pattern = /^[a-zA-Z0-9._]+@[a-zA-Z.]+\.[a-zA-Z]+$/;
    if(pattern.test(email)){
        console.log("Valid Email")
    }
    else{
        console.log("Invalid Email")
    }
}
isValidEmail("RAG_ADJAM@GMAIL.COM")
isValidEmail("RAGADJAM@GMAIL.COM")
isValidEmail("RAG_ADJAM@GMAIL. COM")
isValidEmail("RAG ADJAM@GMAIL.COM")
isValidEmail("RAGADJAM @GMAIL.COM")
isValidEmail(" RAG_ADJAM@GMAIL.COM")
isValidEmail("RAG_ADJAM @GMAIL.COM")
isValidEmail("RAG&*(ADJAM@GMAIL.COM")

output: 
Valid Email
Valid Email
Invalid Email
Invalid Email
Invalid Email
Invalid Email
Invalid Email
Invalid Email
*/

//-------------------------------------------------------------------------------------
