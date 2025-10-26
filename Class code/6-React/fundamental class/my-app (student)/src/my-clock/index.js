import { useEffect, useState } from 'react';

function MyClock(props) {
    const [time, setTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleString());
        }, 1000);

        return () => clearInterval(interval);
    },);

    return (
        <>
            <h1>React Clock</h1>
            <h2>{ time }</h2>
        </>
    )
}

export default MyClock;