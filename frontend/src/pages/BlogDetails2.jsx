import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import Disqus from "disqus-react";
import Layout2 from "../components/Layout/Layout2";
import { useParams } from "react-router-dom";

function BlogDetails2() {
  const { id, title } = useParams(); // ✅ Extract ID & Title from Route
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/articles/${id}`);
        if (!response.ok) throw new Error("Failed to fetch article");
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const disqusShortname = "bako-1";
  const disqusConfig = {
    url: `http://localhost:8000/blog-details/${id}/${encodeURIComponent(title)}`,
    identifier: id,
    title: article?.title,
  };

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <Layout2>
      <section className="shadow-blue white-bg padding mt-0">
        <h2 className="blog-title">{article.title || decodeURIComponent(title)}</h2> {/* ✅ Use decoded title if needed */}
        <ul className="list-inline portfolio-info mt-0">
          <li className="list-inline-item">
            <i className="icon-user"></i>
            {article.created_by_name}
          </li>
          <li className="list-inline-item">
            <i className="icon-calendar"></i>
            {new Date(article.created_at).toLocaleDateString()}
          </li>
          <li className="list-inline-item">
            <i className="icon-folder"></i>
            {article.category}
          </li>
        </ul>
        <div className="blog-content mt-4">
          <Markdown>{article.content}</Markdown>
        </div>
        <div className="mi-blog-details-comments mt-4">
          <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        </div>
      </section>
    </Layout2>
  );
}

export default BlogDetails2;
