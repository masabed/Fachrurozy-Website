import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import Layout from "../components/Layout/Layout"; 
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { id } = useParams(); 
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

  if (loading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!article) return <p>Article not found.</p>;

  return (
    <Layout>
      <section className="shadow-blue white-bg padding mt-0">
        <h2 className="blog-title">{article.title}</h2>
        <ul className="list-inline portfolio-info mt-0">
          <li className="list-inline-item">
            <i className="icon-user"></i> {article.created_by_name || "Unknown"}
          </li>
          <li className="list-inline-item">
            <i className="icon-calendar"></i> {article.created_at ? new Date(article.created_at).toLocaleDateString() : "Unknown Date"}
          </li>
          <li className="list-inline-item">
            <i className="icon-folder"></i> {article.category || "Uncategorized"}
          </li>
        </ul>
        <div className="blog-content mt-4">
          <Markdown>{article.content || "No content available."}</Markdown>
        </div>
        {article.image && (
          <div className="blog-image mt-4">
            <img src={article.image} alt={article.title} style={{ maxWidth: "100%", borderRadius: "8px" }} />
          </div>
        )}
      </section>
    </Layout>
  );
}

export default BlogDetails;
