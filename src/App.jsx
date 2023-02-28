import { useEffect, useState } from 'react'
import { getData } from './components/firestore'
import Game from './components/Game'

export default function App () {
  const [username, setUsername] = useState('')
  const [play, setPlay] = useState('')
  const [data, setData] = useState([])
  const [alert, setAlert] = useState(false)
  const [alert2, setAlert2] = useState(false)

  const fetch = async () => {
    const data = await getData()
    setData(data)
  }

  useEffect(() => {
    fetch()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = username.trim()
    if (value === '' || username === null || username === undefined) {
      setAlert2(true)
      setUsername('')
      setTimeout(() => {
        setAlert2(false)
      }, 1000)
    } else {
      setPlay(true)
    }
  }

  const handleChange = (e) => {
    const text = e.target.value
    const found = data.find((item) => item.username === text)

    if (found) {
      setAlert(true)
      setUsername('')
      setTimeout(() => {
        setAlert(false)
      }, 1500)
    } else {
      setUsername(e.target.value)
    }
  }

  return (
    <div>
      {
        play
          ? <Game username={username} />
          : <div className='bg-dark vh-100'>
            <form onSubmit={handleSubmit} className='d-flex flex-column h-25 align-items-center justify-content-center'>
              {alert2
                ? <label htmlFor='inputUsername' className='form-label text-danger h4'>Please select a username</label>
                : ''}
              <div className='mb-3'>
                {alert
                  ? <label htmlFor='inputUsername' className='form-label text-danger'>Username busy, please select another</label>
                  : <label htmlFor='inputUsername' className='text-white form-label'>Please select a username for play</label>}
                <input onChange={handleChange} value={username} type='text' className='form-control' id='inputUsername' placeholder='Username' />
              </div>
              <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
            </div>
      }
    </div>
  )
}
