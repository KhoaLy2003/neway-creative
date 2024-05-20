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
        type="primary"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: "7px",
          marginTop: "7px",
          padding: "0 24px",
          height: "40px",
          backgroundColor: "#6C36FE",
          borderColor: "#6C36FE",
          color: "#fff",
          fontSize: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
      >
        Quay lại
      </Button>

      {post ? (
        <div className="post mb-3">
          <h1
            style={{
              textAlign: "center",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {post.title}
          </h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* <h5 style={{ marginLeft: 'auto', marginBottom: '20px' }}><UserOutlined />   Admin</h5> */}
              <div style={{ marginBottom: "35px" }}>
                <h3>{post.description}</h3>
              </div>
              <img
                width={500}
                src={post.thumbnail}
                alt="test img"
                style={{ borderRadius: "25px", marginBottom: "35px" }}
              />
              <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Footer />
    </Fragment>
  );
}
