import { MouseEvent, useEffect, useState } from "react"
import { CheckCircleIcon, XCircleIcon } from "lucide-react"
import ShowQuizOverModal from "./ShowQuizOverModal"

const totalQuestions = 10

export default function QuizBox(props: { stopQuiz: () => void }) {
  const [words, setWords] = useState([] as { word: string; videos: string[] }[])
  const [questionCount, setQuestionCount] = useState(0)
  const [counter, setCounter] = useState(0)
  const [correctIdx, setCorrectIdx] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [givenAnswer, setGivenAnswer] = useState<number | null>(null)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    fetch("/api/signs/quiz")
      .then((res) => res.json())
      .then((data) => {
        setWords(data)
        if (data.length === 0) {
          setCounter(counter + 1)
          return
        }
        setCorrectIdx(Math.floor(Math.random() * 4))
        console.log(data)
      })
      .catch((err) => console.log(err))
  }, [questionCount, counter])

  function checkAnswer(e: MouseEvent, index: number) {
    if (givenAnswer != null) return
    setGivenAnswer(index)
    if (correctIdx === index) {
      setScore(score + 1)
    }
    setTimeout(() => {
      if (questionCount + 1 >= totalQuestions) {
        setShowAlert(true)
        return
      }
      setQuestionCount(questionCount + 1)
      setGivenAnswer(null)
    }, 1000)
  }

  function handleAlertAction() {
    setQuestionCount(0)
    setScore(0)
    props.stopQuiz()
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      <ShowQuizOverModal
        open={showAlert}
        score={score}
        totalQuestions={totalQuestions}
        onAction={handleAlertAction}
      />
      <div className='bg-white shadow-md rounded-md p-8'>
        <h1 className='text-4xl font-bold text-center pb-4'>Quiz</h1>
        <div className='flex justify-between items-center gap-4 mb-6'>
          <h2 className='text-xl font-semibold text-center'>Score: {score}</h2>
          <h3 className='text-xl font-semibold text-center'>
            Question: {questionCount + 1}/{totalQuestions}
          </h3>
        </div>
        <div className='grid md:grid-cols-2 gap-4 justify-center items-start'>
          <div>
            {correctIdx != null && words[correctIdx].videos.length && (
              <video
                onError={() => setCounter(counter + 1)}
                className='rounded-md max-w-lg mx-auto'
                src={`/api/proxy-video?url=${
                  words[correctIdx].videos.length
                    ? words[correctIdx].videos[0]
                    : ""
                }`}
                width='640px'
                height='480px'
                controls
                controlsList='nodownload'
                onContextMenu={() => false}
              />
            )}
          </div>
          <div className='grid grid-cols-2 gap-4 justify-center items-stretch'>
            {words.map((word, index) => (
              <button
                key={index + word.word}
                className={`w-full rounded shadow border p-4 transition-all ${
                  givenAnswer === index
                    ? givenAnswer === correctIdx
                      ? "bg-green-200 border-green-400"
                      : "bg-red-200 border-red-400"
                    : ""
                }`}
                onClick={(e) => checkAnswer(e, index)}
              >
                <div className='flex items-center'>
                  {givenAnswer === index ? (
                    givenAnswer === correctIdx ? (
                      <CheckCircleIcon className='w-6 h-6 text-green-500 mr-2' />
                    ) : (
                      <XCircleIcon className='w-6 h-6 text-red-500 mr-2' />
                    )
                  ) : null}
                  {word.word}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
