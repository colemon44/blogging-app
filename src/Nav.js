import React, { useState, useContext } from 'react';
import { db } from './firebaseconfig.js';
import { collection, addDoc, Timestamp, doc, deleteDoc } from 'firebase/firestore';
import { AuthContext } from './context.js';


export default function Nav({ titles, setArticleId, addArticle, removeArticle }) {

    const { user } = useContext(AuthContext);

    const [ newPostTitle, setNewPostTitle ] = useState('');
    const [ newPostContent, setNewPostContent ] = useState('');

    const createPost = (e) => {
        e.preventDefault();

        if (newPostContent.trim() === '' || newPostTitle === '') { return; }
        if (user === null) { return; }

        const payload = {
            author: user.displayName,
            title: newPostTitle,
            body: newPostContent,
            date: Timestamp.now(),
        };

        addDoc(collection(db, "articles"), payload)
            .then((e) => {
                addArticle({id: e.id, title: payload.title});
            });

    }

    const handleChangeTitle = (e) => {
        setNewPostTitle(e.target.value);
    }

    const handleChangePost = (e) => {
        setNewPostContent(e.target.value);
    }

    const handleDelete = (articleID) => {
        deleteDoc(doc(db, "articles", articleID))
            .then((e) => {
                removeArticle(articleID);
            });
    }


    return (
        <nav>
            <form onSubmit={createPost} className="post-form">
                <input type="text" placeholder="Title" value={newPostTitle} onChange={handleChangeTitle} />
                <textarea placeholder="Enter your post here" value={newPostContent} onChange={handleChangePost}></textarea>
                <input type="submit" value="Create New Post" />
            </form>
            <hr />
            <ul>
                {titles &&
                    titles.map((a) => (
                    <li key={a.id} onClick={() => setArticleId(a.id)}>
                        {a.title}

                        <button onClick={() => handleDelete(a.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
  );
}
