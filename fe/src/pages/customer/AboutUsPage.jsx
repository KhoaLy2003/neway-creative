import React, { Fragment } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import aboutUsHeading from "../../assets/ideasy.jpg";
import aboutUs1 from "../../assets/idasy-vision.jpg";
import teamMember1 from "../../assets/Add a heading (1).png";
import teamMember2 from "../../assets/Add a heading.png";
import teamMember3 from "../../assets/Add a heading (2).png";
import teamMember4 from "../../assets/Add a heading (3).png";
import teamMember5 from "../../assets/Add a heading (4).png";
import teamMember6 from "../../assets/Add a heading (5).png";
import "./AboutUsPage.css";

const AboutUsPage = () => {
  return (
    <Fragment>
      <PageHeading />
      <div className="container">
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* <h3>What is Content Calendar</h3> */}
          <img
            src={aboutUsHeading}
            alt="About Us Heading"
            style={{ width: "90%", height: "250px", objectFit: "cover" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div className="vision mb-5">
            <div className="row">
              <div className="col-md-6">
                <h1 style={{ fontWeight: "bold" }} className="mb-5">
                  Vision - Tầm nhìn
                </h1>

                {/* <h5>What is our vision ?</h5> */}
                <p>
                  Chúng tôi mang bên mình một tầm nhìn đơn giản nhưng cũng không
                  kém tham vọng: Tạo ra một thế giới nơi mọi người đều có công
                  cụ và tài nguyên để trở thành người sáng tạo nội dung. Bằng
                  cách tự do hóa việc sáng tạo nội dung, chúng tôi trao quyền
                  cho các cá nhân và doanh nghiệp để chia sẻ câu chuyện, ý tưởng
                  và niềm đam mê của họ với thế giới, từ đó làm phong phú thêm
                  cuộc sống và định hình cộng đồng trong quá trình này. Tại
                  Neway Creative, chúng tôi tin rằng mọi tiếng nói đều quan
                  trọng và chúng tôi cam kết cung cấp sự hỗ trợ và hướng dẫn cần
                  thiết để giải phóng tiềm năng sáng tạo trong mỗi chúng ta. Hãy
                  cùng chúng tôi mở đường đến một tương lai nơi sáng tạo không
                  có giới hạn và mọi cá nhân đều có cơ hội ghi dấu ấn của mình
                  trên thế giới!
                </p>
              </div>
              <div class="col-md-6">
                <img
                  src={aboutUs1}
                  alt="About Us 1"
                  className="img-fluid"
                  style={{ width: "95%", height: "95%", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <div className="mission mb-5">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={aboutUs1}
                  alt="About Us 1"
                  className="img-fluid"
                  style={{ width: "95%", height: "95%", objectFit: "cover" }}
                />
              </div>
              <div className="col-md-6">
                <h1 style={{ fontWeight: "bold" }} className="mb-5">
                  Mission - Sứ mệnh
                </h1>

                {/* <h3>What is our mission ?</h3> */}
                <p>
                  Chúng tôi đặt ra sứ mệnh của mình rất rõ ràng, đó chính là thu
                  hẹp khoảng cách giữa doanh nghiệp và người tiêu dùng thông qua
                  nội dung hữu ích, lôi cuối và đầy giá trị. Chúng tôi hiểu sức
                  mạnh một câu chuyện hay và cách khai thác nó để xây dựng những
                  kết nối có ý nghĩa nhằm thúc đẩy sự tương tác, lòng trung
                  thành và sự phát triển của quý khách hàng. Trong một thế giới
                  tràn ngập thông tin, chúng tôi mong muốn giảm bớt sự ồn ào và
                  cung cấp nội dung gây được tiếng vang với khán giả, để lại ấn
                  tượng lâu dài và thúc đẩy mối quan hệ chân chính giữa thương
                  hiệu và khách hàng của họ.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="team-members mb-5">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ fontWeight: "bold" }} className="mb-5">
              Meet the team members !
            </h1>
          </div>

          <div className="row" style={{ marginBottom: "20px" }}>
            <div className="col-md-4">
              <img
                src={teamMember1}
                alt="1st Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember2}
                alt="2nd Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember3}
                alt="3rd Team Member"
                className="img-fluid"
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <img
                src={teamMember4}
                alt="4th Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember5}
                alt="5th Team Member"
                className="img-fluid"
              />
            </div>
            <div className="col-md-4">
              <img
                src={teamMember6}
                alt="6th Team Member"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUsPage;
