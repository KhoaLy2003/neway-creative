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
      setPosts(allPosts);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    }
  };

  const formatDate = (dateTimeStr) => {
    dateTimeStr = dateTimeStr.toString();

    const year = dateTimeStr.substring(0, 4);
    let month = "";
    let day = "";

    if (dateTimeStr.length >= 6) {
      month = dateTimeStr.substring(4, 6).padStart(2, "0");
    }
    if (dateTimeStr.length >= 8) {
      day = dateTimeStr.substring(6, 8).padStart(2, "0");
    }

    let formattedDate = "";
    if (day && month) {
      formattedDate = `${year}`;
    }

    return formattedDate;
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
                    width={400}
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
                    <div>Đăng vào {formatDate(item.updatedAt)}</div>
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
