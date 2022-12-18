import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'
import Confetti from 'react-confetti'

function App() {
  const [dieData, setDieData] = useState(generateDice)
  const [clickedDice, setClickedDice] = useState([])
  const [didIWin, setDidIWin] = useState(false)

  function generateDice(){
    let dieArray = new Array()
    for (let i = 0; i < 10; i ++){
        let num = Math.floor(Math.random() * 6) + 1;
        dieArray.push({id: i, number: num, clicked: false});
    }
    return dieArray 
  }
  

  useEffect(()=>{
    setClickedDice(dieData.filter(clickedDie => clickedDie.clicked === true))
  }, [dieData])

  useEffect(() =>{
    const numberValue = dieData[0].number
    const sameValue = dieData.every(die => die.number === numberValue)
    const allHeld = dieData.every(die=> die.clicked === true)
    if (clickedDice.length > 0 && allHeld && sameValue ){
      setDidIWin(true)

    }
  }, [clickedDice])

  function rollDice(){
    setDieData(oldData => oldData.map(oldDie =>
        oldDie.clicked ? oldDie : {...oldDie, number : Math.floor(Math.random() * 6) + 1 }
      ))
  }

  function changeColor(id){
    setDieData(oldData =>oldData.map(oldDie =>
      oldDie.id === id ? {...oldDie, clicked: !oldDie.clicked} : oldDie
    ))
  }

  function resetGame(){
    setDieData(generateDice)
    setClickedDice([])
    setDidIWin(false)
  }


  const visualDice = dieData.map(oldDie =>
    (<Die key={oldDie.id} id={oldDie.id} handleClick={changeColor} clicked={oldDie.clicked} number={oldDie.number}/>))

  return(
    <div className='App'>
      <main>
          {didIWin && <Confetti/>}
          <h1>Tenzies</h1>
          <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
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