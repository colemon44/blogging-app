import "./App.css";
import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut} from "@firebase/auth";
import { useAuthState} from "react-firebase-hooks/auth";
import { auth } from "./firebaseconfig";
import Nav from "./Nav";
import Article from "./Article";
import { fetchTitles } from "./articleService";
import { AuthProvider } from './context';

function SignIn() {
  function signInWithGoogle() {
    signInWithPopup(auth, new GoogleAuthProvider())
  }
  return (
    <div className="signin">
      <p>Welcome to my blog</p>
      <button onClick={signInWithGoogle}>Sign In</button>
    </div>
  );
}

function SignOut() {
  return(
    auth.currentUser && (
      <p>
        Hello, {auth.currentUser.displayName}&nbsp;
        <button onClick={() => signOut(auth)}>SignOut</button>
      </p>
    )
  )
}

export default function App() {
    useEffect(() => {
        fetchTitles()
            .then((currTitles) => setTitles(currTitles.map((article) => ({ id: article.id, title: article.title }))));
    }, []);

    const [user] = useAuthState(auth);
    const [titles, setTitles] = useState([]);
    const [articleId, setArticleId] = useState(null);

    const addArticle = (article) => {
        titles.push({id: article.id, title: article.title});
        setArticleId(article.id);
    }

    const removeArticle = (articleId) => {
        const newTitles = titles.filter(t => t.id !== articleId);
        setTitles(newTitles);
        setArticleId(null);
    }

    return (
        <AuthProvider>
            <div className="App">
                <header>{!user ? <SignIn /> : <SignOut />}</header>
                {user && <Nav titles={titles} setArticleId={setArticleId} addArticle={addArticle} removeArticle={removeArticle} />}
                {user && <Article articleId={articleId} />}
            </div>
        </AuthProvider>
  );
}
