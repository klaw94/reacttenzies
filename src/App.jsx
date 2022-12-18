import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'
import Confetti from 'react-confetti'

function App() {
  const [dieData, setDieData] = useState([])
  const [clickedDice, setClickedDice] = useState([])
  const [gameState, setGameState] = useState("playing")

  useEffect(()=>{
      let dieArray = new Array()
      for (let i = 0; i < 10; i ++){
          let num = Math.floor(Math.random() * 6) + 1;
          dieArray.push({id: i, number: num, clicked: false});
      }
      setDieData(dieArray)
  }, []);

  useEffect(()=>{
    setClickedDice(dieData.filter(clickedDie => clickedDie.clicked === true))
  }, [dieData])

  useEffect(() =>{
    if (clickedDice.length > 0 && clickedDice.length === dieData.length){
      setGameState("won")

    }
  }, [clickedDice])

  function rollDice(){
    setDieData(oldData => oldData.map(oldDie =>
        oldDie.clicked ? oldDie : {...oldDie, number : Math.floor(Math.random() * 6) + 1 }
      ))
  }

  function changeColor(id){
    let clickedNumber
    if (clickedDice.length > 0){
      clickedNumber = clickedDice[0].number
    }
    

    setDieData(oldData =>oldData.map(oldDie =>{
      if (oldDie.id === id && (oldDie.number === clickedNumber || clickedDice.length === 0)){
        return {...oldDie, clicked: !oldDie.clicked}
      } else {
        return oldDie
      }
    }))
  }

  function resetGame(){
    setDieData(()=> {
      let dieArray = new Array()
      for (let i = 0; i < 10; i ++){
        let num = Math.floor(Math.random() * 6) + 1;
        dieArray.push({id: i, number: num, clicked: false});
      }
      return dieArray}
    )
    setClickedDice([])
    setGameState("playing")
  }


  const visualDice = dieData.map(oldDie =>
    (<Die key={oldDie.id} id={oldDie.id} handleClick={changeColor} clicked={oldDie.clicked} number={oldDie.number}/>))

  return(
    <div className='App'>
      <main>
          {gameState === "won" && <Confetti/>}
          <h1>Tenzies</h1>
          <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
          <div className="diceDiv">
             {visualDice}
          </div>
          { gameState === "playing" ?  <button onClick={rollDice}>Roll</button> :
          <button onClick={resetGame}>Reset Game</button>}
      </main>
    </div>
  )
}

export default App