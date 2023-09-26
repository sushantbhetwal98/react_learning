import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [useNum, setUseNum] = useState(false);
  const [useChar, setUseChar] = useState(false);
  const [password, setPassword] = useState();

  // useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (useNum) str += "0123456789";
    if (useChar) str += "!@#$%^&*?";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, useNum, useChar, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length+1)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=> {
    passwordGenerator()
  },[length, useNum, useChar, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700'>
        <div className="flex flex-col items-center shadow rounded-lg overflow-hidden p-4 gap-4">
          <h1 className="text-white text-center">Password Generator</h1>
         <div className="flex flex-row w-full">
           <input
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 rounded-l-md'
            placeholder='Password'
            readOnly
            ref = {passwordRef}
          />
          <button 
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 rounded-r-md'
            onClick={copyPasswordToClipboard}
          >copy</button>
         </div>
         <div className="flex text-sm gap-x-4">
          <div className="flex item-center gap-x-1">
            <input 
              type="range" 
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange = {(e) => {setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={useNum}
              id="numberInput"
              onChange={() => setUseNum((prev) => !prev)}
            />
             <label htmlFor='numberInput'>Use Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input 
              type="checkbox"
              defaultChecked={useChar}
              id="characterInput"
              onChange={() => setUseChar((prev) => !prev)}
            />
             <label htmlFor='characterInput'>Use Character</label>
          </div>
         </div>
        </div>
      </div>
    </>
  )
}

export default App
