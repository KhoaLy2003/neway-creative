import React, { Fragment, useState, useEffect } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import { Footer } from "antd/es/layout/layout";
import { getPost } from "../../api/post";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Flex, Space } from "antd";
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

      <div style={{ marginTop: 50 }}>
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
                <div style={{ marginBottom: "35px" }}>
                  <h3>{post.description}</h3>
                </div>
                <img
                  width={400}
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
      </div>

      <Flex justify="center" style={{ marginTop: 40 }}>
        <Button
          size="large"
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </Flex>

      <Footer />
    </Fragment>
  );
}
