import Image from "next/image"
import Link from "next/link"

import { useRouter } from "next/navigation"

export default function Login() {
  const router = useRouter()

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log("login")
    router.push("/admin")
  }

  return (
    <main className='p-8'>
      <div className='min-h-screen bg-white flex flex-col'>
        <Link href='/'>
          <Image
            src='/logo.png'
            alt='Logo'
            width={150}
            height={150}
            className='mr-2'
          />
        </Link>

        <div className='flex mt-10 mb-10 justify-center items-center'>
          <div className='bg-red-100 p-8 rounded-lg shadow-md w-full max-w-md'>
            <h2 className='text-2xl font-bold text-center text-red-600 mb-6'>
              Login
            </h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='mb-4'>
                <label
                  htmlFor='email'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='Enter your email'
                />
              </div>
              <div className='mb-6'>
                <label
                  htmlFor='password'
                  className='block text-gray-700 font-bold mb-2'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  className='w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-red-500'
                  placeholder='Enter your password'
                />
              </div>
              <button
                onClick={handleLogin}
                type='submit'
                className='w-full bg-red-600 text-white font-bold py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
              >
                Login
              </button>
            </form>

            {/* OAuth Section */}
            <div className='mt-6 text-center'>
              <span className='text-gray-600'>Or continue with</span>
            </div>

            <div
              id='openid-buttons'
              className='mx-auto flex flex-col space-y-2 mt-2'
            >
              <div className='flex justify-between space-x-2'>
                <button
                  className='flex items-center justify-center s-btn s-btn__icon s-btn__google border border-black-225 bg-white text-black font-bold py-2 rounded hover:bg-gray-100 transition duration-200 w-full'
                  data-provider='google'
                  data-oauthserver='https://accounts.google.com/o/oauth2/auth'
                  data-oauthversion='2.0'
                >
                  <svg
                    aria-hidden='true'
                    className='native svg-icon iconGoogle w-5 h-5 mr-2'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                  >
                    <path
                      fill='#4285F4'
                      d='M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 0 0 2.38-5.88c0-.57-.05-.66-.15-1.18'
                    ></path>
                    <path
                      fill='#34A853'
                      d='M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 0 1-7.18-2.54H1.83v2.07A8 8 0 0 0 8.98 17'
                    ></path>
                    <path
                      fill='#FBBC05'
                      d='M4.5 10.52a4.8 4.8 0 0 1 0-3.04V5.41H1.83a8 8 0 0 0 0 7.18z'
                    ></path>
                    <path
                      fill='#EA4335'
                      d='M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 0 0 1.83 5.4L4.5 7.49a4.8 4.8 0 0 1 4.48-3.3'
                    ></path>
                  </svg>
                  Log in with Google
                </button>

                <button
                  className='flex items-center justify-center s-btn s-btn__icon s-btn__github border border-black-225 bg-white text-black font-bold py-2 rounded hover:bg-gray-100 transition duration-200 w-full'
                  data-provider='github'
                  data-oauthserver='https://github.com/login/oauth/authorize'
                  data-oauthversion='2.0'
                >
                  <svg
                    aria-hidden='true'
                    className='svg-icon iconGitHub w-5 h-5 mr-2'
                    width='18'
                    height='18'
                    viewBox='0 0 18 18'
                  >
                    <path
                      fill='#010101'
                      d='M9 1a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38l-.01-1.49c-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.4 7.4 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48l-.01 2.2c0 .21.15.46.55.38A8.01 8.01 0 0 0 9 1'
                    ></path>
                  </svg>
                  Log in with GitHub
                </button>
              </div>

              <button
                className='flex items-center justify-center s-btn s-btn__icon s-btn__facebook border border-black-225 bg-white text-black font-bold py-2 rounded hover:bg-gray-100 transition duration-200 mt-2 w-full'
                data-provider='facebook'
                data-oauthserver='https://www.facebook.com/v2.0/dialog/oauth'
                data-oauthversion='2.0'
              >
                <svg
                  aria-hidden='true'
                  className='svg-icon iconFacebook w-5 h-5 mr-2'
                  width='18'
                  height='18'
                  viewBox='0 0 18 18'
                >
                  <path
                    fill='#4167B2'
                    d='M3 1a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm6.55 16v-6.2H7.46V8.4h2.09V6.61c0-2.07 1.26-3.2 3.1-3.2.88 0 1.64.07 1.87.1v2.16h-1.28c-1 0-1.2.48-1.2 1.18V8.4h2.39l-.31 2.42h-2.08V17z'
                  ></path>
                </svg>
                Log in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
