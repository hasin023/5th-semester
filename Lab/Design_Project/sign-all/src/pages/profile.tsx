import AuthForm from "@/components/custom/auth-form"
import Navbar from "@/components/common/Navbar"
import { useUser } from "@/hooks/useUser"
import { Poppins } from "next/font/google"
import Head from "next/head"
import { FormEvent, useEffect, useState } from "react"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

export default function Profile() {
  const [user, setUser] = useUser()
  const [name, setName] = useState("")

  const save = (e: FormEvent) => {
    e.preventDefault()
    // save logic here
  }

  return (
    <>
      <Head>
        <title>Profile - Sign All</title>
      </Head>
      <div className={`${poppins.className} min-h-screen bg-gray-100`}>
        <Navbar />

        <div className='bg-white p-8 shadow-lg rounded-lg max-w-2xl mx-auto my-12'>
          <h1 className='text-4xl font-extrabold text-gray-800 pb-6 text-center'>
            Your Profile
          </h1>
          {!user ? (
            <div className='text-center text-gray-600'>
              <p className='text-lg'>You are not logged in.</p>
            </div>
          ) : (
            <form onSubmit={save} className='space-y-6'>
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-600'>
                  Name:
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                  defaultValue={user.name}
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-200'
                />
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-600'>
                  Email:
                </label>
                <p className='w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-700'>
                  {user.email}
                </p>
              </div>
              <div className='space-y-2'>
                <label className='text-sm font-semibold text-gray-600'>
                  Status:
                </label>
                <p
                  className={`p-3 rounded-lg ${
                    user.isVerified
                      ? "text-green-600 bg-green-100"
                      : "text-red-600 bg-red-100"
                  }`}
                >
                  {user.isVerified ? "Verified" : "Not Verified"}
                </p>
              </div>
              {name && (
                <div className='flex justify-end pt-4'>
                  <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg shadow-lg transition-all duration-300'>
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </>
  )
}
