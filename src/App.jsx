import React, { useCallback, useEffect, useRef, useState } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null)
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) str += "~!`@#%^&*()*/|?";
    if (numberAllowed) str += "0123456789"
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword]);
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='flex justify-center'>
        <div className=' flex justify-center items-center mt-20  w-120 '>
          <input type="text" readOnly className='border -border-gray-500 rounded-md h-10 w-120' value={password} ref={passwordRef} />
          <button className='bg-orange-500 border border-gray-500 h-10 px-3 rounded-md font-bold hover:opacity-80 cursor-pointer' onClick={copyPasswordToClipboard}> Copy</button>
        </div>
      </div>
      <div className='flex justify-center mt-5'>
        <div className=' flex justify-center items-center  w-120 gap-3 font-semibold'>
          <input type="range" onChange={(e) => setLength(e.target.value)} min={6} max={100} />
          <h1>Length : {length}</h1>
          <input type="checkbox" defaultChecked={numberAllowed} onChange={() => setNumberAllowed((prev) => !prev)} />
          <label >Number</label>
          <input type="checkbox" defaultChecked={charAllowed} onChange={() => setCharAllowed((prev) => !prev)} />
          <label >Character</label>
        </div>
      </div>
    </>

  )
}

export default App