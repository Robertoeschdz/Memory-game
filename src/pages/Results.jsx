import { useEffect, useState } from 'react'
import { getData } from '../components/firestore'

export default function Results () {
  const [data, setData] = useState([])
  const [ranking, setRanking] = useState([])

  const fetch = async () => {
    const data = await getData()
    setData(data)
  }

  function errorsComparator (a, b) {
    return a.errors - b.errors
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    const ranking = data.sort(errorsComparator)
    setRanking(ranking)
  }, [data])

  let counter = 1

  return (
    <div className='vh-100 bg-dark'>
      <table className='table container text-white'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>First</th>
            <th scope='col'>Errors</th>
            <th scope='col'>Time</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map(item => (
            <tr key={item.username}>
              <th scope='row'>{counter++}</th>
              <td>{item.username}</td>
              <td>{item.errors}</td>
              <td>{item.minutes.toString().padStart(2, '0')}:{item.seconds.toString().padStart(2, '0')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
