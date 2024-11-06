import Navbar from "@/components/common/Navbar"
import Head from "next/head"
import { Poppins } from "next/font/google"

import { userUserLoaded, useUser } from "@/hooks/useUser"
import Spinner from "@/components/common/Spinner"
import AdminDictionary from "@/components/admin/AdminDictionary"
import { useEffect } from "react"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

const AdminPage = () => {
  const [user, setUser] = useUser()
  const [userLoaded, setUserLoaded] = userUserLoaded()

  useEffect(() => {
    setUser({
      id: 1222,
      name: "hasin",
      email: "hasin@admin.com",
      isVerified: true,
      role: "admin",
    })
    setUserLoaded(true)
  }, [setUser, setUserLoaded])

  if (!userLoaded) return <Spinner />

  return (
    <>
      <Head>
        <title>Admin Panel</title>
      </Head>

      <div className={`${poppins.className} min-h-screen bg-box`}>
        <Navbar />
        {user?.role !== "admin" ? (
          <div className='bg-red-500 text-white text-center py-2'>
            You are not authorized to access this page
          </div>
        ) : (
          <>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='relative flex flex-col items-center rounded-[20px] mx-auto p-4 bg-white bg-clip-border shadow-md mb-6 mt-12'>
                <div className='relative flex h-32 w-full justify-center rounded-xl bg-cover'>
                  <div
                    className={
                      "bg-gradient-to-bl from-[#fbd34d] to-[#f6e27a] h-32 w-full rounded-lg flex items-center justify-center"
                    }
                  >
                    <h1 className='text-2xl font-semibold'>Admin Dashobard</h1>
                  </div>
                </div>
                <AdminDictionary />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AdminPage
