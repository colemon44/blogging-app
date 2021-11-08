import { query, where, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebaseconfig.js';

export async function fetchTitles() {
    const querySnapshot = await getDocs(collection(db, "articles"));
    const titles = [];
    querySnapshot.forEach((docu) => titles.push({ id: docu.id, title: docu.data().title }));
    return titles;
}

export async function fetchArticleById(id) {
    if (id === null) {
        return null;
    }
    const docSnap = await getDoc(doc(db, "articles", id));
    if (docSnap.exists()) {
        return {
            date: docSnap.data().date,
            author: docSnap.data().author,
            title: docSnap.data().title,
            body: docSnap.data().body,
        };
    } else {
        return null;
    }
    return [];
}
