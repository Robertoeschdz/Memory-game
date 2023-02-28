import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

export const saveData = async (errors, minutes, seconds, username) => {
  return await addDoc(collection(db, 'ranking'), {
    errors,
    minutes,
    seconds,
    username
  })
}

export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, 'ranking'))
  const rankings = querySnapshot.docs.map(doc => doc.data())
  return rankings
}
