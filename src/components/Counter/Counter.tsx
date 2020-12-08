import React, {useState} from 'react';

const computeInitialCounter = () => {
    return Math.trunc(Math.random() * 20)
}

const Counter = () => {
    const [counter, setCounter] = useState(() => {
        return computeInitialCounter()
    })


    return (
        <div>
            <h1>Счетчик: {counter}</h1>
            <button onClick={() => setCounter(counter + 1)}>Добавить</button>
            <button onClick={() => setCounter(counter - 1)}>Убрать</button>
            <div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Counter;
