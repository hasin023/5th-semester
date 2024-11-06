import Head from "next/head"
import { Poppins } from "next/font/google"

import Navbar from "@/components/common/Navbar"
import LandingPage from "@/components/custom/landing-page"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Sign All</title>
      </Head>
      <div className={`${poppins.className} min-h-screen`}>
        <Navbar />
        <main className='max-w-7xl mx-auto px-4 py-24 gap-12 justify-between items-center'>
          <LandingPage />
        </main>
      </div>
    </>
  )
}
