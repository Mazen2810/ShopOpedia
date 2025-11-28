import { db } from '../utility/firebaseConfig'
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

const productsCollection = collection(db, 'products')

export default {
  async createProduct(product) {
    const docRef = await addDoc(productsCollection, product)
    return { id: docRef.id, ...product }
  },

  async getProduct() {
    const snapShot = await getDocs(productsCollection)
    return snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
  },

  async getProductById(id) {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)
    return { id: docSnap.id, ...docSnap.data() }
  },

  async UpdateProduct(id, updatedProductData) {
    const docRef = doc(db, 'products', id)
    await updateDoc(docRef, updatedProductData)
    return { id, ...updatedProductData }
  },

  async deleteProduct(id) {
    const docRef = doc(db, 'products', id)
    await deleteDoc(docRef)
  },
}
