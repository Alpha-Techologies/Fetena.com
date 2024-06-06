import { useState } from "react";
import * as math from "mathjs";
import Draggable from "react-draggable";
import { Icon } from "@iconify/react";
import { Divider } from "antd";

  
  const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [screenVal, setScreenVal] = useState("");
    const [customVariables, setCustomVariables] = useState({});

    const [mode, setMode] = useState("rad");

    const handleCalcChange = (e) => {
      setExpression(e.target.value);
    };

    const handleCalcClick = (input) => {
      setExpression((prevExpression) => prevExpression + input);
    };

    const calculate = () => {
      try {
        const allVariables = {
          ...customVariables,
          pi: Math.PI,
          e: Math.E,
          // Add factorial function
          fact: math.factorial,
          sin: mode === "rad" ? Math.sin : math.sin,
          cos: mode === "rad" ? Math.cos : math.cos,
          tan: mode === "rad" ? Math.tan : math.tan,
          asin: mode === "rad" ? Math.asin : math.asin,
          acos: mode === "rad" ? Math.acos : math.acos,
          atan: mode === "rad" ? Math.atan : math.atan,
        };

        const result = math.evaluate(expression, allVariables);
        if (typeof result === "number" && !isNaN(result)) {
          setScreenVal(Number(result).toFixed(4));
        } else {
          setScreenVal("Error: Invalid expression");
        }
      } catch (error) {
        setScreenVal("Error: Invalid expression");
      }
    };

    const clearScreen = () => {
      setExpression("");
      setScreenVal("");
    };

    const backspace = () => {
      const newExpression = expression.slice(0, -1);
      setExpression(newExpression);
    };

    const toggleMode = () => {
      // Toggle between "rad" and "deg" modes
      setMode(mode === "rad" ? "deg" : "rad");
    };

    return (
      <Draggable>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#3A4764] text-white text-center h-fit w-[650px] p-4 rounded-lg'>
          <div className='flex flex-col gap-4'>
            <div className='input-section bg-[#182034] w-full h-[100px] px-4 rounded flex flex-col'>
              <div
                className='screen text-right text-[#EAE3DC] font-bold text-lg h-[25px]'
                value={expression}>
                {expression}
              </div>
              <Divider className='bg-white w-[80%]' />
              <div className='output text-right text-green-500 text-xl font-bold'>
                {screenVal}
              </div>
            </div>

            <div className='button-section flex bg-[#232C43] gap-4 h-fit rounded p-4'>
              <div className='numeric-pad grid grid-cols-3 gap-2'>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                  (input) => (
                    <button
                      className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43]'
                      key={input}
                      onClick={() => handleCalcClick(input)}>
                      {input}
                    </button>
                  )
                )}
                <button
                  className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43]'
                  onClick={() => handleCalcClick(".")}>
                  ,
                </button>
              </div>
              <div className='operators grid grid-cols-4 gap-2'>
                {[
                  "+",
                  "-",
                  "*",
                  "/",
                  "^",
                  "sqrt(",
                  "sin(",
                  "cos(",
                  "tan(",
                  "cbrt(",
                  "asin(",
                  "acos(",
                  "atan(",
                  // Add open parenthesis
                  "(",
                  // Add close parenthesis
                  ")",
                ].map((input) => (
                  <button
                    className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43]'
                    key={input}
                    onClick={() => handleCalcClick(input)}>
                    {input}
                  </button>
                ))}

                <button
                  className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43] flex items-center justify-center'
                  onClick={() => handleCalcClick("pi")}>
                  <Icon icon='mdi:pi' />
                </button>
              </div>
              <div className='control-buttons grid grid-cols-1 gap-2'>
                <button
                  className='w-16 h-16 rounded bg-yellow-500 font-bold text-2xl text-[#EAE3DC]'
                  onClick={clearScreen}>
                  C
                </button>
                <button
                  className='w-16 h-16 rounded bg-green-500 font-bold text-2xl text-[#EAE3DC]'
                  onClick={calculate}>
                  =
                </button>
                <button
                  className='w-16 h-16 rounded bg-error-500 font-bold text-2xl text-[#EAE3DC]'
                  onClick={backspace}>
                  del
                </button>
                <button
                  className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43] flex items-center justify-center'
                  onClick={() => handleCalcClick("fact(")}>
                  <Icon icon='streamline:factorial' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    );
  };

  export default Calculator