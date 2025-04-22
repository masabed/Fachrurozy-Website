import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Blog from "../components/Items/Blog";
import Pagination from "../components/Items/Pagination";

const Bloglist = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/articles");
        if (!response.ok) throw new Error("Failed to fetch articles");
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = articles.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <section className="shadow-blue white-bg padding mt-0">
        <div className="row -mt-50">
          {currentPosts.map((article) => (
            <div className="col-md-6 mt-50" key={article.id}>
              <Link to={`/blogs/${article.id}`} style={{ textDecoration: "none" }}>
                <Blog
                  blog={{
                    id: article.id,
                    title: article.title || "Untitled",
                    author: article.created_by_name || "Unknown",
                    date: article.created_at
                      ? new Date(article.created_at).toLocaleDateString()
                      : "Unknown Date",
                    featureImage: article.image || "images/blog/default.jpg",
                  }}
                />
              </Link>
            </div>
          ))}
        </div>
        <div className="spacer" data-height="50"></div>
        {articles.length > postsPerPage && (
          <Pagination
            itemsPerPage={postsPerPage}
            totalItems={articles.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        )}
      </section>
    </Layout>
  );
};

export default Bloglist;
