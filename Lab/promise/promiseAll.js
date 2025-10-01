//验证多个请求结果是否都是满足条件

const dataOne = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            let data = 'first data';
            // resolve(data)
            reject('first data validate failed')
        }, 800);
    })
}

const dataTwo = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
           let data = 'second data';
        //    resolve(data); 
        reject('second data validate failed')
        }, 700);
    })
}
//promise.all的参数是一个数组，数组的每项都必须是一个promise对象，
//只有当所有项的状态都变成resolve，all()才会走then(),否则走catch()，那么结果是第一个reject()抛出的error

const handleBtnClick = ()=>{
    Promise.all([dataOne(),dataTwo()])
    .then((res)=>{
        console.log('通过验证')
    })
    .catch(err=>console.log(err))
}