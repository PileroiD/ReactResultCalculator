import {useState} from 'react';
import styles from './App.module.css';

function App() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const actionSigns = [
        ['+', clickNumber],
        ['-', clickNumber],
        ['=', getResult],
        ['C', reset]
    ];

    const numbersBtns = numbers.map(item => {
        return <button onClick={clickNumber} key={item} className={styles.btnNumber}>{item}</button>;
    });

    const actionsBtns = actionSigns.map(item => {
        return <button key={item[0]} onClick={item[1]} className={styles.actionItem}>{item[0]}</button>;
    });

    const [elements, setElements] = useState('');
    const [action, setAction] = useState('');
    const [screenClass, setScreenClass] = useState('screen');

    function clickNumber(event) {
        setElements(elements + event.target.innerHTML);
        if (event.target.innerHTML === '+') {
            setAction('+');
        }
        if (event.target.innerHTML === '-') {
            setAction('-');
        }

        setScreenClass('screen');
    }
    
    function reset() {
        setElements('');
    }

    function getResult() {
        const [num1, num2] = elements.split(action);
        
        if (action === '+') {
            setElements(+num1 + +num2);
        } else {
            setElements(+num1 - +num2);
        }

        setScreenClass('screenGreen');
    }

    return (
        <div className={styles.app}>
            <header className={styles.appHeader}>
                <div className={screenClass === 'screen' ? styles.screen : styles.screenGreen}>{elements}</div>
                <div className={styles.btnWrapper}>
                    {numbersBtns}
                </div>
                <div className={styles.actionsWrapper}>
                    {actionsBtns}
                </div>
            </header>
        </div>
    );
}

export default App;
