import { useState, useEffect, useRef } from 'react'
import { useWindowSize } from 'react-use'
import './App.css'
import Die from './components/Die'
import Confetti from 'react-confetti'


function App() {
  const [dieData, setDieData] = useState(generateDice)
  const [didIWin, setDidIWin] = useState(false)
  const [count, setCount] = useState(0)
  const [bestTime, setBestTime] = useState(() => (JSON.parse(localStorage.getItem("score")) || [0]))
  const [time, setTime] = useState(0)

  const { width, height } = useWindowSize()
  const countRef = useRef(null)

  function generateDice(){
    let dieArray = new Array()
    for (let i = 0; i < 10; i ++){
        let num = Math.floor(Math.random() * 6) + 1;
        dieArray.push({id: i, number: num, clicked: false});
    }
    return dieArray 
  }

  console.log(bestTime)

  useEffect(()=>{
    setBestTime(JSON.parse(localStorage.getItem("score")) || [0])
  }, [didIWin])

  useEffect(()=>{
    if ((bestTime[0] === 0 || time < bestTime) && time != 0){
      localStorage.setItem("score", JSON.stringify(time))
    }
  }, [didIWin])
  
  function startTimer(){
    const countTime = () => {
      setTime(prevTime => prevTime + 1)
    }
    countRef.current = setInterval(countTime, 1000);
  }

  useEffect(() => {
    startTimer();
  }, []);

  useEffect(() =>{
    const numberValue = dieData[0].number
    const sameValue = dieData.every(die => die.number === numberValue)
    const allHeld = dieData.every(die=> die.clicked === true)
    if (allHeld && sameValue ){
      clearInterval(countRef.current);
      setDidIWin(true)
    }
  }, [changeColor])

  function addCount(){
    setCount(prevCount => prevCount + 1)
  }

  function rollDice(){
    setDieData(oldData => oldData.map(oldDie =>
        oldDie.clicked ? oldDie : {...oldDie, number : Math.floor(Math.random() * 6) + 1 }
      ))
    addCount();
  }

  function changeColor(id){
      setDieData(oldData =>oldData.map(oldDie =>
      oldDie.id === id ? {...oldDie, clicked: !oldDie.clicked} : oldDie
    ))

  }

  function resetGame(){
    setDieData(generateDice)
    setDidIWin(false)
    setCount(0)
    setTime(0)
    startTimer()
  }


  const visualDice = dieData.map(oldDie =>
    (<Die key={oldDie.id} id={oldDie.id} handleClick={changeColor} clicked={oldDie.clicked} number={oldDie.number}/>))

  return(
    <div className='App'>
      {didIWin && <Confetti width={width} height={height}/>}
      <main>
          <h1>Tenzies</h1>
          <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
          <div className='scoreDiv'>
            <h4>Rolls: {count}</h4>
            <h4>Timer: {time}</h4>
            <h4>Best Time: {bestTime}</h4>
          </div>
          <div className="diceDiv">
             {visualDice}
          </div>
          { !didIWin ?  <button onClick={rollDice}>Roll</button> :
          <button onClick={resetGame}>Reset Game</button>}
      </main>
    </div>
  )
}

export default App