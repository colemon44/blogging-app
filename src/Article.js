import { useState, useEffect } from "react";
import { fetchArticleById } from "./articleService";

export default function Article({ articleId }) {
  const [article, setArticle] = useState(null);

  useEffect(() => {
      fetchArticleById(articleId)
        .then(currArticle => setArticle(currArticle));
  }, [articleId]);

    const date = article ? new Date(article.date.seconds*1000) : null;

  return (
    <article>
      {!article ? (
        <p>No article selected</p>
      ) : (
        <section>
          <h2>{article.title}</h2>
            <p className="date">{`Posted: ${date ? date.toString() : "N/A"}`}</p>
            <p className="author">{`Author: ${article.author}`}</p>
          <p className="body">{article.body}</p>
        </section>
      )}
    </article>
  );
}
