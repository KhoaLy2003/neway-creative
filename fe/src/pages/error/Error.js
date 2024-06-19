import { Button, Space, Typography } from "antd";
import Title from "antd/es/typography/Title";

const ErrorPage = ({
  title = "An error occurred!",
  message = "Something went wrong!",
}) => {
  return (
    <>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-4 mx-auto">
            <Space direction="vertical" size={"middle"}>
              <Title level={2}>{title}</Title>
              <Typography.Text>{message}</Typography.Text>
              <Button type="primary" size="large" href="/">
                Back to home
              </Button>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
