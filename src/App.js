import { useState } from "react";

function App() {
  const [previousOperand, setPreviousOperand] = useState(null);
  const [currentOperand, setCurrentOperand] = useState(0);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [overwrite, setOverwrite] = useState(false);

  const allClear = () => {
    setCurrentOperand(0);
    setPreviousOperand(null);
    setResult(null)
    setOperation(null);
    setErrorMsg(null);
  }

  const deleteNumber = () => {
    if (currentOperand === 0) return;

    if (currentOperand.toString().length === 1) {
      setCurrentOperand(0)
    } else {
      setCurrentOperand(currentOperand.toString().slice(0, -1))
    }
  }

  const appendNumber = (digit) => {
    if (digit === "." && currentOperand.toString().includes(".")) return;

    if (result && !previousOperand) {
      setPreviousOperand(result);
      setCurrentOperand(digit)
    }

    if (currentOperand === 0 || !currentOperand || overwrite) {
      setResult(null);
      setCurrentOperand(digit)
      setOverwrite(false);
        } else {
      setCurrentOperand(currentOperand + digit)
    }
    return;
  }

  const compute = () => {
    const current = parseFloat(currentOperand);
    let prev;

    if (result) {
      prev = result;
    } else {
      prev = parseFloat(previousOperand)
    }
    
    let computation;

    switch (operation) {
      case "+":
        computation = prev + current;
        break;
      
      case "-":
        computation = prev - current;
        break;

      case "*":
        computation = prev * current;
        break;
      
      case "÷":
        if (current === 0 ) {
          setErrorMsg("Can't divide by 0")
          return;
        } else {
          computation = prev / current;
        }
        break;

      default:
        return;
    }
     setResult(computation.toString());
     setCurrentOperand(null);
     setPreviousOperand(null);
  }

  const handleButtonsClick = (e) => {
    const value = e.target.value;

    if (e.target.tagName.toLowerCase() === 'button') {
      if (value.match(/[0-9.]/)) {
        appendNumber(value);
      } else if (['+', '-', '*', '÷'].includes(value)) {
        if (!result && !previousOperand) {
          setPreviousOperand(currentOperand);
          setCurrentOperand("");
          setOperation(value);
        } else if (result) {
            setPreviousOperand(result);
            setOperation(value);
        } else {
          compute();
          setOperation(value);
        }
      } else if (value === '=') {
          if (previousOperand && operation) {
            setOverwrite(true);
            setOperation(null);
            compute();
          }
        }
    }
    return;
  }



  return (
   <div id="calculator_container" className="flex flex-col h-4/6 w-3/12">
      <div id="displays_container" className="bg-black-70 w-full h-1/5 text-white">
        <div id="operations" className="flex justify-end items-center opacity-70 h-1/2 text-sm pr-4 border border-black">{result ? result : previousOperand && !errorMsg ? previousOperand : ""} {previousOperand || result ? operation : ""}</div>
        <div id="results" className="flex justify-end items-center h-1/2 text-4xl pr-4">{errorMsg ? <span className="text-red-500 text-sm font-bold">{errorMsg}</span> : result && overwrite ? result : currentOperand}</div>
      </div>
      <div id="buttons" 
           className="grid grid-cols-4 h-4/5"
           onClick={(e) => handleButtonsClick(e)}
      >
        <button onClick={() => allClear()} value="AC" className="col-span-2">AC</button>
        <button onClick={() => deleteNumber()} value="DEL">DEL</button>
        <button value="÷">÷</button>
        <button value="1">1</button>
        <button value="2">2</button>
        <button value="3">3</button>
        <button value="*">*</button>
        <button value="4">4</button>
        <button value="5">5</button>
        <button value="6">6</button>
        <button value="+">+</button>
        <button value="7">7</button>
        <button value="8">8</button>
        <button value="9">9</button>
        <button value="-">-</button>
        <button value=".">.</button>
        <button value="0">0</button>
        <button value="=" className="col-span-2">=</button>
      </div>
   </div>
  );
}

export default App;
