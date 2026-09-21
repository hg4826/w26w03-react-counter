import './App.css'
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const plusOne = (prev: number) => prev + 1

  return (
    <>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(plusOne)
          setCount(plusOne)
          setCount(plusOne)
          setCount(plusOne)
          setCount(plusOne)
        }}
      >
        증가
      </button>
    </>
  )
}

export default App
