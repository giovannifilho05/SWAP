import {
  collection,
  query,
  getDocs,
  getDoc,
  where,
  QueryFieldFilterConstraint,
} from 'firebase/firestore'
import { db } from '../services/firebase'

export interface Departament extends Institute {
  institute: Institute
}

export type Institute = {
  id: string
  initials: string
  name: string
}

export type ProjectType = {
  id: string
  initials: string
  name: string
}

export type User = {
  id: string
  name: string
  lastName: string
  cpf: number
  phone: number
  userType: string
}

async function getCollection(name: string, where?: QueryFieldFilterConstraint) {
  const collectionRef = collection(db, name)

  const q = query(collectionRef, where)
  const querySnapshot = await getDocs(q)

  return querySnapshot
}

export async function getAllDepartaments() {
  const querySnapshot = await getCollection('departament')

  const dataPromises = [] as Promise<Departament>[]
  querySnapshot.forEach((doc) => {
    const dataPromise = getDoc(doc.get('institute'))
      .then((result) => result.data() as Institute)
      .then(({ initials: instituteInitials, name: instituteName }) => {
        return {
          id: doc.id,
          ...doc.data(),
          institute: {
            id: doc.get('institute').id,
            initials: instituteInitials,
            name: instituteName,
          },
        } as Departament
      })

    dataPromises.push(dataPromise)
  })

  const result = await Promise.all(dataPromises)
  return result
}

export async function getAllDataFromCollection<T>(
  collectionName: string,
  where?: QueryFieldFilterConstraint,
): Promise<T[]> {
  const querySnapshot = await getCollection(collectionName, where)

  const result = [] as T[]
  querySnapshot.forEach((doc) => {
    result.push({ id: doc.id, ...doc.data() } as T)
  })

  return result
}
