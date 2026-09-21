import { useEffect, useState } from 'react'
import './App.css'

const WORK_TIME = 25 * 60
const BREAK_TIME = 5 * 60

function App() {
  const [mode, setMode] = useState<'work' | 'break'>('work')
  const [seconds, setSeconds] = useState(WORK_TIME)
  const [isRunning, setIsRunning] = useState(false)

  // 타이머 실행
  useEffect(() => {
    if (!isRunning) return

    const timer = setInterval(() => {
      setSeconds((previousSeconds) => {
        if (previousSeconds <= 1) {
          setIsRunning(false)
          return 0
        }

        return previousSeconds - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isRunning])

  // 작업 또는 휴식 모드 변경
  function changeMode(nextMode: 'work' | 'break') {
    setMode(nextMode)
    setIsRunning(false)

    if (nextMode === 'work') {
      setSeconds(WORK_TIME)
    } else {
      setSeconds(BREAK_TIME)
    }
  }

  // 현재 모드의 처음 시간으로 초기화
  function resetTimer() {
    setIsRunning(false)
    setSeconds(mode === 'work' ? WORK_TIME : BREAK_TIME)
  }

  // 초를 00:00 형태로 표시
  function formatTime(totalSeconds: number) {
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
  }

  return (
    <main className={`app ${mode}`}>
      <section className="timer-card">
        <h1>🍅 뽀모도로 타이머</h1>

        <div className="mode-buttons">
          <button
            className={mode === 'work' ? 'selected' : ''}
            onClick={() => changeMode('work')}
          >
            집중
          </button>

          <button
            className={mode === 'break' ? 'selected' : ''}
            onClick={() => changeMode('break')}
          >
            휴식
          </button>
        </div>

        <p className="timer">{formatTime(seconds)}</p>

        {seconds === 0 && (
          <p className="message">
            {mode === 'work' ? '집중 시간이 끝났어요!' : '휴식 시간이 끝났어요!'}
          </p>
        )}

        <div className="control-buttons">
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? '일시정지' : '시작'}
          </button>

          <button onClick={resetTimer}>초기화</button>
        </div>
      </section>
    </main>
  )
}

export default App