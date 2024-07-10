import React, { Fragment, useState, useEffect } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import { getAllPosts } from "../../api/post";
import { Link } from "react-router-dom";
import { List } from "antd";

export default function ViewPostPage() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const response = await getAllPosts();
      const allPosts = response.data;

      const sortedPosts = allPosts.sort((a, b) => {
        const dateA = new Date(...a.createdAt);
        const dateB = new Date(...b.createdAt);
        return dateB - dateA;
      });

      console.log("Sorted posts: ", sortedPosts);

      setPosts(sortedPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const formatDate = (dateArray) => {
    const date = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  console.log(posts);

  return (
    <Fragment>
      <PageHeading />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ width: "60%" }}>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: (page) => {
                console.log(page);
              },
              pageSize: 3,
            }}
            dataSource={posts}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div style={{ flex: "0 0 auto", marginRight: "70px" }}>
                  <img
                    width={300}
                    alt="logo"
                    src={item.thumbnail}
                    style={{ borderRadius: "20px", marginBottom: "5px" }}
                  />
                </div>
                <div style={{ flex: "1", minWidth: 0 }}>
                  <List.Item.Meta
                    title={
                      <Link to={`/posts/${item.postId}`}>
                        <h2 style={{ fontWeight: "bold" }}>{item.title}</h2>
                      </Link>
                    }
                    description={item.description}
                  />
                  {/* {item.content.length > 100 ? (
                    <>{item.content.substring(0, 100)}... <Link to={`/posts/${item.postId}`}>Read more</Link></>
                  ) : (
                    <>{item.content} <Link to={`/posts/${item.postId}`}>Read more</Link></>
                  )} */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div>Đăng vào {formatDate(item.createdAt)}</div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Fragment>
  );
}
