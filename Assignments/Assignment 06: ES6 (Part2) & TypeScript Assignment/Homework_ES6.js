// Part 1: Callbacks
function fetchData(url, callback) {
    console.log(`Fetching data from ${url}...`);
    setTimeout(() => {
        callback(`Data from ${url}`);
    }, 2000);
}

// Part 2: Promises (refactor version)
function fetchDataPromise(url) {
    return new Promise((resolve, reject) => {
        if (!url){
            reject(`Invalid URL`);
            return;
        }
        console.log(`Fetching data from ${url}...`);
        setTimeout(() => {
            resolve(`Data from ${url}`);
        }, 2000);
    });
}

// Part 3: Async/Await
async function loadData(url) {
    try {
        const result = await fetchDataPromise(url);
        console.log(result);
    } catch (err) {
        console.error("Problem:", err);
    }
}
