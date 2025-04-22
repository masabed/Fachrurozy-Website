import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Blog from "../Items/Blog";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/articles?limit=3");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        
        // Convert API data to match the expected format
        const formattedBlogs = data.map((article) => ({
          id: article.id, // API's unique ID
          title: article.title, // API's title
          category: article.category || "Uncategorized", // Use API's category, or default if null
          featureImage: article.image || "images/blog/default.jpg", // Default image if null
          date: new Date(article.created_at).toLocaleDateString(), // Convert date format
          author: article.created_by_name, // Use API's created_by field
        }));

        setBlogs(formattedBlogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-4" key={blog.id}>
            <Blog blog={blog} />
          </div>
        ))}
      </div>
      <div className="spacer" data-height="50"></div>
      <div className="text-center">
        <Link to="/blogs" className="btn btn-default">
          Show All Blogs
        </Link>
      </div>
    </>
  );
}

export default Blogs;
