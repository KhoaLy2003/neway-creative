import React, { Fragment, useState, useEffect } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import { Footer } from "antd/es/layout/layout";
import { getAllPosts } from "../../api/post";
import { Link } from "react-router-dom";

export default function ViewPostPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts(); // Fetch all posts from your service
      const allPosts = response.data;
      setPosts(allPosts); // Update the state with the fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <Fragment>
      <PageHeading />

      <div className="post d-flex justify-content-center mb-3">
        <ul className="mb-3 mt-3">
          {posts.map((post) => (
            <li className="mb-3" key={post.postId}>
              <Link to={`/posts/${post.postId}`}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </Link>
            </li>
          ))}{" "}
        </ul>
      </div>

      <Footer />
    </Fragment>
  );
}
