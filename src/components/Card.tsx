'use client'
export const dynamic = 'force-dynamic';
import { useGlobalContext } from '@/context/GlobalContext';
import { useCards } from '@/hooks/useCards';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import HugeiconsUndo03 from '@/icons/HugeiconsUndo03';
import { ICard, ICardStatusUpdate, ICC } from '@/types/type'
import { shuffleArray } from '@/utils/shuffleArray';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const Card = ({ cards, category_id }: ICC) => {
  const { isUpdating, updateCardsBatchMutation } = useCards();
  const { setIsContinue } = useGlobalContext();

  const [localCounter, setLocalCounter] = useLocalStorage<{ cat_id: number; count: number; }[]>('local_counter', []);
  const [lastPage, setLastPage] = useState(false);
  const [turnCard, setTurnCard] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mixedCards, setMixedCards] = useState<ICard[]>([]);



  const router = useRouter();



  useEffect(() => {

    if (isNaN(localCounter.find((id) => id.cat_id === category_id)?.count || 0)) {
      localStorage.removeItem('local_counter');
    }

    if (localCounter.find((id) => id.cat_id === category_id)) {
      setProgress(((localCounter.find((id) => id.cat_id === category_id)?.count || 0) * 100) / (cards.length))
      return
    } else {
      setLocalCounter((prev) => [...prev, { cat_id: category_id, count: 0 }])
      setProgress(((localCounter.find((id) => id.cat_id === category_id)?.count || 0) * 100) / (cards.length))
    }



    // else {
    //   setMixedCards([...cards])
    // }

  }, [localCounter, setIsContinue, category_id, cards.length, setLocalCounter, cards])



  useEffect(() => {
    if ((localCounter.find((id) => id.cat_id === category_id)?.count || 0) === 0) {
      setMixedCards(shuffleArray(cards))
    }
  }, [cards, localCounter, category_id])



  //  const [last_review_rates,set_last_review_rates]=useState<('fehl'|'schwer'|'gut'|'leicht')[]>([])
  //old=>  const [last_review_rates,set_last_review_rates]=useLocalStorage<[{id:number,last_review_rate:('fehl'|'schwer'|'gut'|'leicht')}]>('last_review_rates',[])
  // new=> 
  // const [last_review_rates, set_last_review_rates] = useLocalStorage<{ id: number; last_review_rate: 'wrong' | 'hard' | 'good' | 'easy'; }[]>('last_review_rates', []);
  const [last_review_rates, set_last_review_rates] = useLocalStorage<ICardStatusUpdate[]>('last_review_rates', []);
  console.log("last_review_rates in components/Card.tsx : " + last_review_rates)
  // const last_review_rates: ('fehl' | 'schwer' | 'gut' | 'leicht')[] = []




  const handleNextCard = ({ card_id, status }: ICardStatusUpdate) => {
    setTurnCard(false)

    if ((localCounter.find((id) => id.cat_id === category_id)?.count || 0) <= cards.length - 1) {
      setProgress(((localCounter.find((id) => id.cat_id === category_id)?.count || 0) * 100) / (cards.length))
      console.log(card_id, status)
      set_last_review_rates((preItems) => {
        const selectedItem = preItems.find((item) => item.card_id == card_id)
        if (selectedItem == null) {
          return [...preItems, { card_id: card_id, status: status }]
        } else {
          return preItems.map(item => {
            if (item.card_id == card_id) {
              return { ...item, status: status }
            } else {
              return item;
            }
          })
        }
      })
      if ((localCounter.find((id) => id.cat_id === category_id)?.count || 0) < cards.length - 1) {
        setLocalCounter((prev) =>
          prev.map((item) =>
            item.cat_id === category_id ? { ...item, count: item.count + 1 } : item
          )
        );
      } else {
        setLastPage(true)
      }
    }
  }

  const handleSaveButton = () => {
    setLocalCounter((prev) =>
      prev.filter((item) => item.cat_id !== category_id)
      // prev.map((item) =>
      //   item.cat_id === category_id ? { ...item, count: 0 } : item
      // )
    )
    updateCardsBatchMutation(last_review_rates);
    // updateCardsBatch([{ card_id: 1, status: "good" }, { card_id: 2, status: "good" }])

    localStorage.removeItem('last_review_rates');
    router.push('/')
  }

  const handlePreviousCard = () => {
    setTurnCard(false)
    setProgress((((localCounter.find((id) => id.cat_id === category_id)?.count || 0) - 1) * 100) / (cards.length))
    if ((localCounter.find((id) => id.cat_id === category_id)?.count || 0) > 0) {
      setLocalCounter((prev) =>
        prev.map((item) =>
          item.cat_id === category_id ? { ...item, count: item.count - 1 } : item)
      )
    }
  }
  console.log("this is localCounter in card: " + JSON.stringify(localCounter))
  console.log("this is mixedCards in card: " + JSON.stringify(mixedCards))


  return (
    //card Container
    <>
      {lastPage ? (
        <div className='flex flex-col items-center justify-between h-screen p-4'>
          <div className='h-1/2 flex items-end'>
            <h1 className='text-3xl font-semibold'>Gratulieren dir</h1>
          </div>
          <button onClick={handleSaveButton} className='bg-green-600 font-bold text-xl w-full rounded-md p-4 mb-4 hover:bg-green-700 transition'>
            {isUpdating ? <>saving...</> : <>save</>}</button>
        </div>
      ) : (
        <div className='bg-[#0f172b] h-screen min-h-svh max-h-svh flex flex-col items-center py-2 px-2 '>

          {/* previous Card button */}
          <button className='bg-slate-700 absolute left-4 top-8 p-4 rounded-full'
            onClick={handlePreviousCard}
          ><span className='text-2xl'><HugeiconsUndo03 /></span></button>

          {/* progress line */}
          <div className='bg-gray-600 h-1 w-full rounded-full'>
            <div className='bg-green-500 h-full  rounded-full' style={{ width: `${progress}%` }}></div>
          </div>

          {/* card detail container */}
          <div className=' w-full h-full'>
            {/* card Title */}
            <div className=' flex  justify-center p-4  text-center items-end h-1/2'>
              <div className='  text-3xl font-medium text-[#fff] overflow-hidden h-auto w-full text-wrap '>
                {mixedCards[localCounter.find((id) => id.cat_id === category_id)?.count || 0]?.title}</div>
            </div>

            {/* card Description*/}

            {turnCard &&
              <>
                <div className='bg-gray-100 h-[0.5px] w-full'></div>
                <div className=' flex justify-center p-4 text-center items-start h-1/2 '>
                  <div className=' text-3xl font-medium text-[#fff] overflow-hidden h-auto w-full text-wrap'>
                    {mixedCards[localCounter.find((id) => id.cat_id === category_id)?.count || 0]?.description}</div>
                </div>
              </>
            }
          </div>



          {/* card Buttons */}
          <div className='bg-slate-800  flex justify-around  py-[2px]  rounded-xl  w-[360px] '>
            {turnCard ? (
              <div>
                <button className='py-4 w-20 m-1 select-none rounded-md border-[1.5px] border-[#e11f1f] bg-[#4608098f] text-[#e11f1f] hover:bg-[#e11f1f] hover:text-[#460809] hover:font-semibold  transition-colors '
                  onClick={() => handleNextCard({ card_id: mixedCards[localCounter.find((id) => id.cat_id === category_id)?.count || 0].card_id, status: 'wrong' })}
                >Fehl</button>

                <button className='py-4 w-20 m-1 select-none rounded-md border-[1.5px] border-[#cca000] bg-[#4320048f] text-[#cca000] hover:bg-[#cca000] hover:text-[#432004] hover:font-semibold  transition-colors'
                  onClick={() => handleNextCard({ card_id: mixedCards[localCounter.find((id) => id.cat_id === category_id)?.count || 0].card_id, status: 'hard' })}
                >Schwer</button>

                <button className='py-4 w-20 m-1 select-none rounded-md border-[1.5px] border-[#00b4e1] bg-[#052f4a8f] text-[#00b4e1] hover:bg-[#00b4e1] hover:text-[#052f4a] hover:font-semibold  transition-colors'
                  onClick={() => handleNextCard({ card_id: mixedCards[localCounter.find((id) => id.cat_id === category_id)?.count || 0].card_id, status: 'good' })}
                >Gut</button>

                <button className='py-4 w-20 m-1 select-none rounded-md border-[1.5px] border-[#60ff04]  bg-[#032e158f] text-[#60ff04] hover:bg-[#60ff04] hover:text-[#032e15] hover:font-semibold transition-colors'
                  onClick={() => handleNextCard({ card_id: mixedCards[localCounter.find((id) => id.cat_id === category_id)?.count || 0].card_id, status: 'easy' })}
                >Liecht</button></div>
            ) : (


              <button onClick={() => setTurnCard(true)}
                className='text-2xl py-3 mx-2 w-full m-1 select-none rounded-lg border-[1.5px] border-violet-600 bg-[#2e0d6881] text-violet-500 hover:bg-violet-600 hover:text-violet-950 hover:font-semibold  transition-all'>
                umdehren</button>
            )}

          </div>
        </div>
      )}
    </>
  )
}

export default Card