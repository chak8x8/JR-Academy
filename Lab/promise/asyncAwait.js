// async await是嵌套最深的一個promise的語法糖
// async聲明一個function是異步的，async函數的返回值是個promise對象
// 所以就是async用於聲明一個function的異步的，以await用於等待一個異步方法執行完成
// await關鍵字只async函數內有效。在async函數體脂外使用他，會有syntax Error
// reject狀態
    // promise錯誤通catch捕捉
    // async await一般用try catch捕捉

const buyFruit = (fruit) => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => {
            console.log(fruit);
            resolve(fruit);
        }, 1000);
    })
}

const fetchFruit = async () => {
    try {
        const res1 = await buyFruit('apple');
        await buyFruit('banana');
        await buyFruit('orange');
    } catch (error) {
        console.error(error);
    }
}