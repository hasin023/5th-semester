import Navbar from "@/components/common/Navbar"
import React, { useRef, useState } from "react"

interface VideoRefElement extends HTMLVideoElement {
  srcObject: MediaStream | null
}

const SignDetection: React.FC = () => {
  const videoRef1 = useRef<VideoRefElement | null>(null)
  const videoRef2 = useRef<VideoRefElement | null>(null)
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false)
  const [stream, setStream] = useState<MediaStream | null>(null)

  const startCamera = async (): Promise<void> => {
    try {
      const mediaStream: MediaStream =
        await navigator.mediaDevices.getUserMedia({
          video: true,
        })
      setStream(mediaStream)

      if (videoRef1.current) {
        videoRef1.current.srcObject = mediaStream
        await videoRef1.current.play()
      }

      if (videoRef2.current) {
        videoRef2.current.srcObject = mediaStream
        await videoRef2.current.play()
      }

      setIsCameraActive(true)
    } catch (err) {
      console.error("Error accessing the camera: ", err)
    }
  }

  const stopCamera = (): void => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
      setStream(null)
    }

    if (videoRef1.current) {
      videoRef1.current.srcObject = null
    }
    if (videoRef2.current) {
      videoRef2.current.srcObject = null
    }

    setIsCameraActive(false)
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100'>
      <Navbar />

      <main className='container mx-auto px-4 py-8'>
        {/* Header Section */}
        <div className='max-w-3xl mx-auto text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            ASL Recognition
          </h1>
          <p className='text-lg text-gray-600 leading-relaxed'>
            Experience real-time American Sign Language detection powered by
            advanced AI. Start your camera to begin converting signs into text
            instantly.
          </p>
        </div>

        {/* Video Feeds Container */}
        <div className='max-w-6xl mx-auto'>
          <div
            className={`grid gap-6 ${
              isCameraActive ? "md:grid-cols-2" : "md:grid-cols-1"
            }`}
          >
            {/* Main Video Feed */}
            <div className='relative'>
              <div className='bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video'>
                <video
                  ref={videoRef1}
                  className='w-full h-full object-cover'
                  autoPlay
                  playsInline
                  muted
                />

                {/* Camera Controls */}
                {!isCameraActive ? (
                  <div className='absolute inset-0 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm'>
                    <button
                      onClick={startCamera}
                      className='bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2'
                      type='button'
                      aria-label='Start camera'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M15 10l4.5-4.5M19.5 5.5L15 10M19 11v10a2 2 0 01-2 2H7a2 2 0 01-2-2V5a2 2 0 012-2h7M7 15h7'
                        />
                      </svg>
                      Start Camera
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={stopCamera}
                    className='absolute top-4 right-4 bg-red-500/80 hover:bg-red-600 text-white p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 group'
                    type='button'
                    aria-label='Stop camera'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      className='w-6 h-6'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </button>
                )}

                {/* Status Indicator */}
                <div className='absolute bottom-4 left-4 flex items-center gap-2'>
                  <div
                    className={`w-3 h-3 rounded-full ${
                      isCameraActive ? "bg-green-500" : "bg-gray-500"
                    }`}
                  ></div>
                  <span className='text-white text-sm font-medium'>
                    {isCameraActive ? "Camera Active" : "Camera Inactive"}
                  </span>
                </div>
              </div>
            </div>

            {/* Second Video Feed */}
            {isCameraActive && (
              <div className='relative'>
                <div className='bg-gray-900 rounded-xl overflow-hidden shadow-2xl aspect-video'>
                  <video
                    ref={videoRef2}
                    className='w-full h-full object-cover'
                    autoPlay
                    playsInline
                    muted
                  />
                  {/* Processing Indicator */}
                  <div className='absolute bottom-4 left-4 flex items-center gap-2'>
                    <div className='w-3 h-3 rounded-full bg-blue-500 animate-pulse'></div>
                    <span className='text-white text-sm font-medium'>
                      Processing Feed
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions Panel */}
          <div className='mt-8 bg-white rounded-xl p-6 shadow-lg'>
            <h2 className='text-xl font-semibold text-gray-900 mb-4'>
              How to Use
            </h2>
            <div className='grid md:grid-cols-3 gap-4 text-gray-600'>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                  <span className='text-blue-600 font-medium'>1</span>
                </div>
                <p>Click the start button to activate your camera</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                  <span className='text-blue-600 font-medium'>2</span>
                </div>
                <p>Position yourself in frame and start signing</p>
              </div>
              <div className='flex items-start gap-3'>
                <div className='w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0'>
                  <span className='text-blue-600 font-medium'>3</span>
                </div>
                <p>View the real-time text translation on screen</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SignDetection
