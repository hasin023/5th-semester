import Navbar from "@/components/common/Navbar"
import Searchbar from "@/components/common/Searchbar"
import Spinner from "@/components/common/Spinner"
import { Poppins } from "next/font/google"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"

const poppins = Poppins({ weight: ["400", "600", "800"], subsets: ["latin"] })

const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
export default function Dictionary() {
  const [words, setWords] = useState([] as { word: string; _id: string }[])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(0)
  const [alphabet, setAlphabet] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/signs?prefix=${alphabet}&page=${page + 1}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response)
        setWords(response.contents || [])
        setTotalPages(response.totalPages)
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [page, alphabet])

  function onPageChange(selectedItem: { selected: number }) {
    console.log("selectedItem ", selectedItem)
    setPage(selectedItem.selected)
  }

  function changeAlphabet(alphabet: string) {
    setAlphabet(alphabet)
    setPage(0)
  }

  return (
    <>
      <Head>
        <title>ASL Dictionary - Sign All</title>
      </Head>

      <div className={`${poppins.className} min-h-screen bg-box`}>
        <Navbar />
        <div className='px-4'>
          <div className='glass-primary my-12 p-4 rounded border mx-auto max-w-7xl'>
            <h1 className='text-2xl font-bold'>
              Explore, discover, and learn sign language
            </h1>
            <Searchbar />
          </div>

          <div className='glass-primary my-4 p-e rounded border mx-auto max-w-7xl flex flex-wrap justify-center items-center'>
            <button
              onClick={() => changeAlphabet("")}
              className='px-2 text-sm py-1 bg-red-500 rounded shadow-sm m-2 hover:bg-red-600 text-white'
            >
              All
            </button>

            {alphabets.map((alphabet, index) => (
              <button
                onClick={() => changeAlphabet(alphabet)}
                key={index + alphabet}
                className='px-2 text-sm py-1 bg-red-500 rounded shadow-sm m-2 hover:bg-red-600 text-white'
              >
                {alphabet}
              </button>
            ))}
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <div className='pt-8'>
              <div className='grid justify-between items-center gap-4 lg:grid-cols-3 md:grid-cols-2 text-center'>
                {words.map((word, i) => (
                  <div key={word._id + i}>
                    <Link
                      href={`/dictionary/word/${word.word}`}
                      className={`p-2 m-2 text-sm`}
                    >
                      {word.word?.split(",")[0]}
                    </Link>
                  </div>
                ))}
              </div>
              <ReactPaginate
                className='flex justify-center items-center gap-4 flex-wrap py-12'
                pageLinkClassName={
                  "px-3 text-sm py-1 bg-red-500 rounded shadow-sm m-2 hover:bg-red-600 text-white font-semibold"
                }
                pageCount={totalPages}
                breakLabel='...'
                nextLabel='->'
                previousLinkClassName='px-4 py-1 border-2 rounded-lg outline-none hover:bg-red-500 hover:text-white'
                nextLinkClassName='px-4 py-1 border-2 rounded-lg outline-none hover:bg-red-500 hover:text-white'
                pageRangeDisplayed={5}
                previousLabel='<-'
                renderOnZeroPageCount={null}
                activeLinkClassName='!bg-gray-800 !text-white'
                initialPage={page}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}
