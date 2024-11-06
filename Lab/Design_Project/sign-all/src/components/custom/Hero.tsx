import React from "react"
import Image from "next/image"

const Hero = () => {
  return (
    <section className='flex items-start justify-center'>
      <div className='container mx-auto flex flex-col items-center justify-center text-center space-y-8'>
        <div className='w-full max-w-2xl'>
          <Image
            src='/sign-language-speakers.jpg'
            alt='Hero Image'
            width={1000}
            height={1000}
            className='max-w-full h-auto'
          />
        </div>
        <h1 className='text-black text-5xl font-bold'>
          Welcome to Our Sign Language App
        </h1>
        <p className='text-lg text-red-500 max-w-2xl'>
          Explore the world of sign language with our tools like detection,
          dictionary, quizzes, and more.
        </p>
        <a
          href='detection'
          className='mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600'
        >
          Start Detection
        </a>
      </div>
    </section>
  )
}

export default Hero
