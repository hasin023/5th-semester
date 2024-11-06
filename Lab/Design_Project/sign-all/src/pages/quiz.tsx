import Head from "next/head"
import { Poppins } from "next/font/google"

import Navbar from "@/components/common/Navbar"
import QuizBox from "@/components/custom/QuizBox"

import { useRouter } from "next/router"
import { useState } from "react"

import toast from "react-hot-toast"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

const QuizPage = () => {
  const router = useRouter()
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const stopQuiz = () => setIsQuizStarted(false)

  const user = {
    id: 1222,
    name: "hasin",
    email: "hasin@admin.com",
    isVerified: true,
    role: "admin",
  }

  const startQuiz = () => {
    if (!user) {
      toast.error("Please Login to start a quiz")
      router.push("/login")
      return
    }
    setIsQuizStarted(true)
  }

  return (
    <>
      <Head>
        <title>Quiz - Sign All</title>
      </Head>

      <div className={`${poppins.className} min-h-screen bg-box`}>
        <Navbar />

        {isQuizStarted ? (
          <>
            <QuizBox stopQuiz={stopQuiz} />
          </>
        ) : (
          <>
            <div className='relative min-h-screen bg-gray-100'>
              <div
                className='absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat'
                style={{
                  backgroundImage: "url('/sign-language-862x570.jpg')",
                  filter: "brightness(0.7)",
                }}
              ></div>

              <div className='relative z-10 flex flex-col items-center py-40 bg-white/70 backdrop-blur-sm w-full'>
                <div className='w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 bg-white shadow-lg rounded-lg p-8'>
                  <h1 className='text-4xl font-extrabold mb-6 text-center text-gray-800'>
                    Take a Quiz
                  </h1>
                  <p className='text-lg text-center mb-6 text-gray-600'>
                    Test Your Knowledge of American Sign Language
                  </p>
                  <p className='text-center mb-8 text-gray-600'>
                    Ready to put your sign language skills to the test? Take our
                    quiz to see how well you know the American Sign Language
                    (ASL) alphabet.
                  </p>
                  <div className='flex justify-center'>
                    <button
                      onClick={startQuiz}
                      className='bg-red-500 text-white px-8 py-4 rounded-full shadow-lg font-semibold hover:bg-red-600'
                    >
                      Start Quiz
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default QuizPage
