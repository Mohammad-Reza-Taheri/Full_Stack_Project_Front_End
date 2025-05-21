'use client'
import { useLocalStorage } from '@/hooks/useLocalStorage';
import HugeiconsUndo03 from '@/icons/HugeiconsUndo03';
import { ICC } from '@/types/type'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

// const Card = ({title,description}:ICard) => {


const Card = ({ cards }: ICC) => {
  // const [local,setLocal]=useLocalStorage<string>('key','value');

  const [counter, setCounter] = useState(0);
  const [lastPage, setLastPage] = useState(false);
  const [turnCard, setTurnCard] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  //  const [last_review_rates,set_last_review_rates]=useState<('fehl'|'schwer'|'gut'|'leicht')[]>([])
  //  const [last_review_rates,set_last_review_rates]=useLocalStorage<[{id:number,last_review_rate:('fehl'|'schwer'|'gut'|'leicht')}]>('last_review_rates',[])
  const [last_review_rates, set_last_review_rates] = useLocalStorage<{ id: number; last_review_rate: 'fehl' | 'schwer' | 'gut' | 'leicht'; }[]>('last_review_rates', []);
  console.log("last_review_rates in components/Card.tsx :" + last_review_rates)
  // const last_review_rates: ('fehl' | 'schwer' | 'gut' | 'leicht')[] = []
  const handleNextCard = (id: number, last_review_rate: 'fehl' | 'schwer' | 'gut' | 'leicht') => {

    setTurnCard(false)

    if (counter <= cards.length - 1) {


      setProgress(((counter + 1) * 100) / (cards.length))

      set_last_review_rates((preItems) => {
        // return [...preItems, { id: id, last_review_rate: last_review_rate }]
        const selectedItem = preItems.find((item) => item.id == id)
        if (selectedItem == null) {
          return [...preItems, { id: id, last_review_rate: last_review_rate }]
        } else {
          return preItems.map(item => {
            if (item.id == id) {
              return { ...item, last_review_rate: last_review_rate }
            } else {
              return item;
            }
          })
        }
      })
      if (counter < cards.length - 1) {
        setCounter(counter + 1);
      } else {
        setLastPage(true)
      }
    }
  }

  const handleSaveButton = () => {
    localStorage.removeItem('last_review_rates');
    router.push('/')
  }
  const handlePreviousCard = () => {
    setTurnCard(false)
    setProgress(((counter - 1) * 100) / (cards.length))
    if (counter > 0) {
      setCounter(counter - 1)
    }
  }


  return (
    // bg-[#0f172b]
    //card Container
    <>
      {lastPage ? (
        <div>last page
          <button onClick={handleSaveButton} className='bg-green-600 p-4'>save</button>
        </div>
      ) : (
        <div className='bg-[#0f172b] h-screen min-h-svh max-h-svh flex flex-col items-center py-2 px-2 '>

          {/* previous Card button */}
          <button className='bg-slate-700 absolute left-4 top-8 p-4 rounded-full'
            onClick={handlePreviousCard}
          ><span className='text-2xl'><HugeiconsUndo03 /></span></button>

          {/* progress line */}
          <div className='bg-gray-600 h-2 w-full rounded-full'>
            <div className='bg-green-500 h-full  rounded-full' style={{ width: `${progress}%` }}></div>
          </div>

          {/* card detail container */}
          <div className=' w-full h-full'>
            {/* card Title */}
            <div className=' flex  justify-center p-4  text-center items-end h-1/2'>
              <div className='  text-3xl font-medium text-[#fff] overflow-hidden h-auto w-full text-wrap '>{cards[counter].title}</div>
            </div>

            {/* card Description*/}

            {turnCard &&
              <>
                <div className='bg-gray-100 h-[0.5px] w-full'></div>
                <div className=' flex justify-center p-4 text-center items-start h-1/2 '>
                  <div className=' text-3xl font-medium text-[#fff] overflow-hidden h-auto w-full text-wrap'>{cards[counter].description}</div>
                </div>
              </>
            }
          </div>



          {/* card Buttons */}
          <div className='bg-slate-800  flex justify-around  py-[2px]  rounded-xl  w-[360px] '>
            {turnCard ? (
              <div>
                <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#e11f1f] bg-[#4608098f] text-[#e11f1f] hover:bg-[#e11f1f] hover:text-[#460809] hover:font-semibold  transition-colors '
                  onClick={() => handleNextCard(cards[counter].card_id, 'fehl')}
                >Fehl</button>

                <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#cca000] bg-[#4320048f] text-[#cca000] hover:bg-[#cca000] hover:text-[#432004] hover:font-semibold  transition-colors'
                  onClick={() => handleNextCard(cards[counter].card_id, 'schwer')}
                >Schwer</button>

                <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#00b4e1] bg-[#052f4a8f] text-[#00b4e1] hover:bg-[#00b4e1] hover:text-[#052f4a] hover:font-semibold  transition-colors'
                  onClick={() => handleNextCard(cards[counter].card_id, 'gut')}
                >Gut</button>

                <button className='py-4 w-20 m-1 rounded-md border-[1.5px] border-[#60ff04]  bg-[#032e158f] text-[#60ff04] hover:bg-[#60ff04] hover:text-[#032e15] hover:font-semibold transition-colors'
                  onClick={() => handleNextCard(cards[counter].card_id, 'leicht')}
                >Liecht</button></div>
            ) : (


              <button onClick={() => setTurnCard(true)}
                className='text-2xl py-3 mx-2 w-full m-1 rounded-lg border-[1.5px] border-violet-600 bg-[#2e0d6881] text-violet-500 hover:bg-violet-600 hover:text-violet-950 hover:font-semibold  transition-all'>
                umdehren</button>
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default Card