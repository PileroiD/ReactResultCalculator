import {useState} from 'react';
import styles from './App.module.css';

function App() {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const actionSigns = [
        {type: '+', fn: clickNumber},
        {type: '-', fn: clickNumber},
        {type: '=', fn: getResult},
        {type: 'C', fn: reset},
    ];

    const numbersBtns = numbers.map(item => {
        return <button onClick={clickNumber} key={item} className={styles.btnNumber}>{item}</button>;
    });

    const actionsBtns = actionSigns.map(({type, fn}) => {
        return <button key={type} onClick={() => fn(type)} className={styles.actionItem}>{type}</button>;
    });

    const [elements, setElements] = useState('');
    const [action, setAction] = useState('');
    const [screenClass, setScreenClass] = useState('screen');

    function clickNumber(elem) {
        if (elem === '+' || elem === '-') {
            if (elements.length > 0 && !elements.includes('-') && !elements.includes('+')) {
                setElements((prevType) => prevType + elem);
                setAction(elem);
            } else if (+elements < 0) {
                setElements((prevType) => prevType + elem);
                setAction(elem);
            }
        } else {
            const number = elem.target.innerHTML;
            setElements((prevNum) => prevNum + number)
        }

        setScreenClass('screen');
    }
    
    function reset() {
        setElements('');
    }

    function getResult() {
        if (elements.includes(action) && elements) {
            const array = elements.split(action).filter(item => item);
            let [num1, num2] = array;
            const isMinus = elements[0] === '-';
    
            if (isMinus) {
                num1 = num1.includes('-') ? num1 : '-' + num1;
            }
    
            const result = action === '+' ? +num1 + +num2 : +num1 - +num2;
            setElements(result.toString());
            setScreenClass('screenGreen');
        }
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
