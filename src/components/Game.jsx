import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { saveData } from './firestore'

export default function Game ({ username }) {
  const [randomArray, setRandomArray] = useState([])
  const [activeCardId, setActiveCardId] = useState('')
  const [activeCard, setActiveCard] = useState(false)
  const [twoActive, setTwoActive] = useState(false)
  const [corrects, setCorrects] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [errors, setErrors] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const navigate = useNavigate()
  const cards = [
    { id: 1, url: '/apache.avif', flipped: false },
    { id: 2, url: '/c++.png', flipped: false },
    { id: 3, url: '/css.png', flipped: false },
    { id: 4, url: '/github.avif', flipped: false },
    { id: 5, url: '/go.png', flipped: false },
    { id: 6, url: '/java.png', flipped: false },
    { id: 7, url: '/js.png', flipped: false },
    { id: 8, url: '/linux.avif', flipped: false },
    { id: 9, url: '/php.png', flipped: false },
    { id: 10, url: '/python.png', flipped: false },
    { id: 11, url: '/apache.avif', flipped: false },
    { id: 12, url: '/c++.png', flipped: false },
    { id: 13, url: '/css.png', flipped: false },
    { id: 14, url: '/github.avif', flipped: false },
    { id: 15, url: '/go.png', flipped: false },
    { id: 16, url: '/java.png', flipped: false },
    { id: 17, url: '/js.png', flipped: false },
    { id: 18, url: '/linux.avif', flipped: false },
    { id: 19, url: '/php.png', flipped: false },
    { id: 20, url: '/python.png', flipped: false }
  ]

  useEffect(() => {
    const shuffledArray = cards.sort(() => Math.random() - 0.5)
    setRandomArray(shuffledArray)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (corrects === cards.length / 2) {
        console.log('end')
      } else {
        if (seconds < 59) {
          setSeconds(seconds + 1)
        } else {
          if (minutes < 59) {
            setMinutes(minutes + 1)
            setSeconds(0)
          } else {
            handleAgain()
          }
        }
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds, seconds])

  const handleFlip = (e, id) => {
    if (e.target.classList.contains('card-face-front')) {
      if (!twoActive) {
        let updatedItems = []
        if (activeCard) {
          updatedItems = randomArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                flipped: true
              }
            }
            return item
          })
          setRandomArray(updatedItems)
          setTwoActive(true)
          if (activeCardId + 10 === id || activeCardId - 10 === id) {
            setCorrects(corrects + 1)
            setTwoActive(false)
            setActiveCard(false)
            setActiveCardId('')
            if (corrects + 1 === randomArray.length / 2) {
              setCompleted(true)
            }
          } else {
            setTimeout(function (id) {
              updatedItems = randomArray.map((item) => {
                if (item.id === id || item.id === activeCardId) {
                  return {
                    ...item,
                    flipped: false
                  }
                }
                return item
              })
              setRandomArray(updatedItems)
              setTwoActive(false)
              setActiveCard(false)
              setActiveCardId('')
              setErrors(errors + 1)
            }, 800)
          }
        } else {
          updatedItems = randomArray.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                flipped: true
              }
            }
            return item
          })
          setActiveCard(true)
          setActiveCardId(id)
          setRandomArray(updatedItems)
        }
      }
    }
  }

  const handleResults = () => {
    saveData(errors, minutes, seconds, username)
    navigate('/results')
  }

  const handleAgain = () => {
    setRandomArray([])
    setActiveCardId('')
    setActiveCard(false)
    setTwoActive(false)
    setCorrects(0)
    setCompleted(false)
    setErrors(0)
    setMinutes(0)
    setSeconds(0)
    const shuffledArray = cards.sort(() => Math.random() - 0.5)
    setRandomArray(shuffledArray)
  }

  return (
    <div className='screen'>
      <div className='container'>
        <div style={{ height: '12px' }} />
        <div className='row'>
          {randomArray.map(item => (
            <div key={uuidv4()} onClick={(e) => handleFlip(e, item.id)} className={`content m-3 col-md-2 col-4 ${item.flipped ? 'is-flipped' : ''}`} id={item?.id}>
              <div className='card-face card-face-front' />
              <img className={`image card-face card-face-back ${item.flipped ? 'display-card-face-back' : ''}`} src={item?.url} alt='img' />
            </div>
          ))}
        </div>
        <span className='text-danger h3'>{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}</span>
        {completed
          ? <div>
            <button className='btn btn-success me-5' onClick={handleResults}>View results</button>
            <button className='btn btn-danger' onClick={handleAgain}>Try again</button>
            </div>
          : ''}
        <div style={{ height: '220px' }} />
      </div>
    </div>
  )
}
