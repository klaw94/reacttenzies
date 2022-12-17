import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './components/Die'

function App() {
  const [dieData, setDieData] = useState([])

  useEffect(()=>{
      let dieArray = new Array()
      for (let i = 0; i < 10; i ++){
          let num = Math.floor(Math.random() * 6) + 1;
          dieArray.push({id: i, number: num, clicked: false});
      }
      setDieData(dieArray)
  }, []);


  function roleDice(){
    setDieData(oldData => oldData.map(oldDie =>
        oldDie.clicked ? oldDie : {...oldDie, number : Math.floor(Math.random() * 6) + 1 }
      )
  )
  }

  function changeColor(id){
    setDieData(oldData =>oldData.map(oldDie =>
      oldDie.id === id ? {...oldDie, clicked: !oldDie.clicked} : oldDie
    ))
  }

  const visualDice = dieData.map(oldDie =>
    (<Die key={oldDie.id} id={oldDie.id} handleClick={changeColor} clicked={oldDie.clicked} number={oldDie.number}/>))

  return(
    <div className='App'>
      <main>
          <h1>Tenzies</h1>
          <h3>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</h3>
          <div className="diceDiv">
             {visualDice}
          </div>
          <button onClick={roleDice}>Roll</button>
      </main>
    </div>
  )
}

export default App