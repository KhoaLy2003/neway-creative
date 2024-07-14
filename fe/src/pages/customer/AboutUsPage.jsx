import React, { Fragment } from "react";
import PageHeading from "../../components/Layouts/PageHeading";
import teamMember1 from "../../assets/ha.png";
import teamMember2 from "../../assets/di.png";
import teamMember3 from "../../assets/tri.png";
import teamMember4 from "../../assets/ngan.png";
import teamMember5 from "../../assets/khoa.png";
import teamMember6 from "../../assets/minh.png";
import teamMember7 from "../../assets/quyen.png";
import "./AboutUsPage.css";
import { Card, List } from "antd";
import Meta from "antd/es/card/Meta";

const AboutUsPage = () => {
  const teamList1 = [
    {
      title: "Phạm Đinh Hoàng Hà",
      description: "Leader, Founder",
      image: teamMember1,
    },
  ];

  const teamList2 = [
    {
      title: "Đào Duy Di",
      description: "Business Manager",
      image: teamMember2,
    },
    {
      title: "Phan Đình Trí",
      description: "Marketing Manager",
      image: teamMember3,
    },
    { title: "Nguyễn Thảo Ngân", description: "Designer", image: teamMember4 },
  ];

  const teamList3 = [
    {
      title: "Lý Ngọc Đăng Khoa",
      description: "Project Developer",
      image: teamMember5,
    },
    {
      title: "Đinh Trần Nhật Minh",
      description: "Project Developer",
      image: teamMember6,
    },
    {
      title: "Trần Đức Quyền",
      description: "Project Developer",
      image: teamMember7,
    },
  ];

  const renderTeamList = (teamList) => (
    <List
      style={{ marginBottom: 25 }}
      grid={{
        gutter: 60,
        column: 3,
      }}
      dataSource={teamList}
      renderItem={(item) => (
        <List.Item>
          <Card
            cover={
              <div style={{ overflow: "hidden", height: 380 }}>
                <img
                  alt="example"
                  style={{ height: "100%", width: "100%" }}
                  src={item.image}
                />
              </div>
            }
          >
            <Meta
              title={item.title}
              description={item.description}
              style={{ textAlign: "center" }}
            />
          </Card>
        </List.Item>
      )}
    />
  );

  const renderCenteredTeamList = (teamList) => (
    <List
      style={{ marginBottom: 25 }}
      grid={{
        gutter: 60,
        column: 1,
      }}
      dataSource={teamList}
      renderItem={(item) => (
        <List.Item style={{ display: "flex", justifyContent: "center" }}>
          <Card
            cover={
              <div style={{ overflow: "hidden", height: 380 }}>
                <img
                  alt="example"
                  style={{ height: "100%", width: "100%" }}
                  src={item.image}
                />
              </div>
            }
          >
            <Meta
              title={item.title}
              description={item.description}
              style={{ textAlign: "center" }}
            />
          </Card>
        </List.Item>
      )}
    />
  );

  return (
    <Fragment>
      <PageHeading />
      <div className="container">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div className="vision mb-5">
            <div className="row">
              <div className="col-md-7">
                <h1 style={{ fontWeight: "bold" }} className="mb-5">
                  Vision - Tầm nhìn
                </h1>

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
              <div className="col-md-5" style={{ textAlign: "center" }}>
                <img
                  src="https://res.cloudinary.com/df75ybox6/image/upload/v1716114694/ideasy/auoftyvadj75rnx15ste.jpg"
                  alt=""
                  style={{ width: "80%" }}
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
              <div className="col-md-5" style={{ textAlign: "center" }}>
                <img
                  src="https://res.cloudinary.com/df75ybox6/image/upload/v1716114694/ideasy/auoftyvadj75rnx15ste.jpg"
                  alt=""
                  style={{ width: "80%" }}
                />
              </div>
              <div className="col-md-7">
                <h1 style={{ fontWeight: "bold" }} className="mb-5">
                  Mission - Sứ mệnh
                </h1>

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

        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ fontWeight: "bold", marginBottom: 20 }}>
              Thành viên tại IDEASY !
            </h1>
          </div>

          {renderCenteredTeamList(teamList1)}
          {renderTeamList(teamList2)}
          {renderTeamList(teamList3)}
        </div>
      </div>
    </Fragment>
  );
};

export default AboutUsPage;
