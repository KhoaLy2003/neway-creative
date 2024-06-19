import React from "react";
import "./About.css";
import "../../assets/root.css";
import featureImage from "../../assets/feature-image.jpg";
import { Button, Card, Col, Divider, List, Row } from "antd";
import { Link } from "react-router-dom";
import Logo from "../../assets/ideasy.jpg";

const About = () => {
  return (
    <div className="best-features">
      <div className="custom-container">
        <div className="row">
          <div className="col-md-12">
            <Divider orientation="center" orientationMargin="0">
              <h2 style={{ color: "#000000" }}>Giới thiệu về Ideasy</h2>
            </Divider>
          </div>
          <div className="col-md-6">
            <div className="left-content">
              <p>
                Chào mừng bạn đến với Ideasy, người bạn đồng hành đáng tin cậy
                của bạn trong hành trình ra nội dung hấp dẫn nhằm thúc đẩy các
                doanh nghiệp vừa và nhỏ phát triển trong bối cảnh kỹ thuật số.
                Ra đời từ niềm đam mê của sáu bộ óc dám nghĩ dám làm tại Đại học
                FPT, chúng tôi đặt ra mục tiêu cách mạng hóa hoạt động tiếp thị
                nội dung cho các doanh nghiệp vừa và nhỏ.
              </p>
              <ul className="featured-list" style={{ padding: 0 }}>
                <li>
                  <Link to="/about-us">Về chúng tôi</Link>
                </li>
                <li>
                  <a href="#what-we-offer">Chúng tôi đem lại gì</a>
                </li>
                <li>
                  <a href="#how-to-use">Cách sử dụng lịch ý tưởng</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6">
            <div className="right-image">
              <img src={featureImage} alt="" />
            </div>
          </div>

          {/* About us */}
          {/* <section id="about-us" style={{ marginTop: 20 }}>
            <Row>
              <Divider>
                <h3 style={{ color: "#000000" }}>About Us</h3>
              </Divider>
              <Space direction="vertical" size={"large"}>
                <Col span={12} style={{ margin: "auto" }}>
                  <img src={featureImage} alt="About Us Thumbnail" />
                </Col>
                <Col span={24} style={{ margin: "auto" }}>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam ut ante nec leo consequat elementum. Cras sagittis
                    libero sit amet justo fermentum, at fringilla libero
                    accumsan. Sed auctor lectus sit amet augue fermentum
                    blandit. Nullam fermentum magna eu fermentum ultrices. Morbi
                    convallis bibendum magna, eget feugiat lorem hendrerit non.
                    Curabitur pulvinar, nisl nec dignissim vulputate, libero
                    magna maximus nulla, nec tempor arcu purus eget justo. Ut ut
                    nulla quam.
                  </p>
                </Col>
              </Space>
            </Row>
          </section> */}
          {/* What we offer */}
          <section id="what-we-offer">
            <Row justify={"center"}>
              <Divider orientation="left" orientationMargin="0">
                <h3 style={{ color: "#000000" }}>Chúng tôi đem lại gì</h3>
              </Divider>
              <Col span={12} style={{ textAlign: "center", marginBottom: 20 }}>
                <h5>
                  Neway Creative hân hạnh mang đến 3 gói lịch ý tưởng sáng tạo
                  nội dung tuyệt vời, hỗ trợ đắc lực cho hành trình kết nối với
                  khách hàng của bạn
                </h5>
              </Col>
            </Row>

            <List
              grid={{
                gutter: 60,
                column: 1,
              }}
              dataSource={data}
              renderItem={(item) => (
                <List.Item>
                  <Card>
                    <div className="card-content">
                      <div className="image-container">
                        <img
                          alt={item.title}
                          className="card-image"
                          src={Logo}
                        />
                      </div>
                      <div className="text-content">
                        <h3 style={{ color: "#6C36FE" }}>{item.title}</h3>
                        <p>{item.description}</p>
                        <ul style={{ padding: 0 }}>
                          {item.details.map((detail, index) => (
                            <li key={index}>{detail}</li>
                          ))}
                        </ul>
                        <Button
                          type="primary"
                          style={{ left: "auto", marginLeft: "auto" }}
                          href="/calendars"
                        >
                          Xem thêm
                        </Button>
                      </div>
                    </div>
                  </Card>
                </List.Item>
              )}
            />
          </section>
          {/* How to use */}
          <section id="how-to-use" style={{ marginTop: 20 }}>
            <Row justify={"space-around"}>
              <Divider orientation="center" orientationMargin="0">
                <h3 style={{ color: "#000000" }}>Cách sử dụng lịch ý tưởng</h3>
              </Divider>
              <Col span={9}>
                <h4 style={{ textAlign: "center" }}>
                  HƯỚNG DẪN SỬ DỤNG - Mobile Phone
                </h4>
                <ul style={{ padding: 0 }}>
                  <li>
                    <strong>Bước 1:</strong> Nhấp đường link sản phẩm được cung
                    cấp sau khi thanh toán.
                  </li>
                  <li>
                    <strong>Bước 2:</strong> Nhấp chọn dấu 3 chấm góc phải trên
                    cùng. Sau đó, chọn Duplicate page.
                  </li>
                  <li>
                    <strong>Bước 3:</strong> Đăng nhập/đăng ký tài khoản Notion.
                  </li>
                  <li>
                    <strong>Bước 4:</strong> Chọn biểu tượng cài đặt “⚙” ở thanh
                    bên trái. Sau đó, nhấp chọn biểu tượng “🌐” để chuyển ngôn
                    ngữ sang tiếng anh.
                  </li>
                  <li>
                    <strong>Bước 5:</strong> Nhấn chọn vào ngày bất kỳ để xem
                    các ý tưởng gợi ý.
                  </li>
                  <li>
                    <strong>Bước 6:</strong> Bắt tay vào soạn thảo bài đăng với
                    các ý tưởng có sẵn thôi nào 😉.
                  </li>
                </ul>
              </Col>
              <Col span={9}>
                <h4 style={{ textAlign: "center" }}>
                  HƯỚNG DẪN SỬ DỤNG - Laptop
                </h4>
                <ul style={{ padding: 0 }}>
                  <li>
                    <strong>Bước 1:</strong> Nhấp đường link sản phẩm được cung
                    cấp sau khi thanh toán.
                  </li>
                  <li>
                    <strong>Bước 2:</strong> Nhấp chọn Duplicate ở góc phải trên
                    cùng.
                  </li>
                  <li>
                    <strong>Bước 3:</strong> Đăng nhập/đăng ký tài khoản Notion.
                  </li>
                  <li>
                    <strong>Bước 4:</strong> Chọn biểu tượng cài đặt “⚙” ở thanh
                    bên trái. Sau đó, nhấp chọn biểu tượng “🌐” để chuyển ngôn
                    ngữ sang tiếng anh.
                  </li>
                  <li>
                    <strong>Bước 5:</strong> Nhấp chọn vào ngày bất kỳ để xem
                    các ý tưởng gợi ý.
                  </li>
                  <li>
                    <strong>Bước 6:</strong> Bắt tay vào soạn thảo bài đăng với
                    các ý tưởng có sẵn thôi nào 😉.
                  </li>
                </ul>
              </Col>
            </Row>
          </section>
        </div>
      </div>
    </div>
  );
};

const data = [
  {
    title: "Lịch Basic",
    description:
      "Lịch Basic là lựa chọn linh hoạt, phù hợp cho bất kỳ ngành nghề nào, cung cấp ý tưởng sáng tạo hàng ngày để duy trì sự mới mẻ trong nội dung của bạn.",
    details: [
      "- Phù hợp cho mọi lĩnh vực: Có thể áp dụng cho bất kỳ ngành nghề nào.",
      "- Sử dụng ngay lập tức: Sẵn sàng sử dụng với thời gian 3 tháng.",
      "- 90 ý tưởng cho 90 ngày: Cung cấp một ý tưởng sáng tạo cho mỗi ngày.",
    ],
  },
  {
    title: "Lịch Advanced",
    description:
      "Lịch Advanced được thiết kế riêng cho từng lĩnh vực, giúp nội dung của bạn trở nên liên quan và cuốn hút hơn, hiện có sẵn cho các lĩnh vực Yoga, Thú Y, và Cà phê.",
    details: [
      "- Thiết kế riêng cho từng lĩnh vực: Giúp nội dung của bạn trở nên cuốn hút hơn, đi sát hơn những giá trị cốt lõi mà doanh nghiệp bạn muốn truyền tải đến khách hàng, tăng khả năng mua hàng của khách hàng.",
      "- Thời gian sử dụng linh hoạt: Giúp bạn lập kế hoạch và triển khai nội dung một cách hiệu quả.",
      "- Hiện có sẵn cho 3 lĩnh vực:",
      "+ Yoga: Gợi ý nội dung về tập luyện, sức khỏe và phong cách sống lành mạnh.",
      "+ Thú Y: Ý tưởng xoay quanh chăm sóc thú cưng, sức khỏe và dinh dưỡng cho động vật.",
      "+ Cà phê: Nội dung về pha chế, thưởng thức và văn hóa cà phê.",
    ],
  },
  {
    title: "Lịch Premium",
    description:
      "Lịch Premium là sản phẩm tốt nhất của chúng tôi, được thiết kế riêng cho từng lĩnh vực với các bài viết mẫu từ chuyên gia, giúp bạn dễ dàng hình dung và định hướng kế hoạch nội dung chất lượng cao.",
    details: [
      "- Bao gồm bài viết mẫu từ chuyên gia: Đặc biệt có từ 5 đến 10 bài viết ghi sẵn bởi các chuyên gia sáng tạo nội dung.",
      "- Nội dung chất lượng cao: Mỗi ý tưởng đều được tối ưu để thu hút và giữ chân khách hàng, giúp bạn nổi bật hơn trên thị trường.",
    ],
  },
];

export default About;
