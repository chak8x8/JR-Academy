// 譬如，點擊按鈕請求，當請求超過3秒還沒返回數據，提示用戶請求超時

const data = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = 'request timeout';
            resolve(data);
        }, 3000)
    })
}

const fetchData = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let data = 'some data';
            resolve(data);
        }, 2000);
    })
}

const handleBtnClick = () => {
    let promiseArr = [timeout(), fetchData()];
    Promise.race(promiseArr).then(res => {
        if (res === 'request timeout') {
            console.log('request timeout');
        } else {
            console.log('do something');
        }
    })
}

handleBtnClick();