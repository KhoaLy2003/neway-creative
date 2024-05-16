import React, { Fragment, useState, useEffect } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import { Footer } from "antd/es/layout/layout";
import { getPost } from "../../api/post";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function ViewPostDetail() {
  const [post, setPost] = useState(null);
  const { postId } = useParams();
  const navigate = useNavigate();

  const fetchPost = async () => {
    try {
      console.log(postId);
      const response = await getPost(parseInt(postId)); // Fetch all posts from your service
      const postData = response.data;
      console.log(postData);
      setPost(postData); // Update the state with the fetched posts
      console.log(post);
    } catch (error) {
      console.error("Error fetching post:", error.message);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  console.log(post);

  return (
    <Fragment>
      <PageHeading />

      <Button
        type="text"
        style={{ margin: "auto" }}
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>

      {post ? (
        <div className="post mb-3">
          <h2 style={{ textAlign: "center" }}>{post.title}</h2>
          <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </Fragment>
  );
}
