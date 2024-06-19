import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const ResultContent = ({ status, title, subTitle, btnText, path }) => {
  const navigate = useNavigate();

  const handlerOnClick = () => {
    navigate(path);
  };

  return (
    <>
      {status && (
        <Result
          status="success"
          title={title}
          subTitle={subTitle}
          extra={[
            <Button type="primary" key="console" onClick={handlerOnClick}>
              {btnText}
            </Button>,
          ]}
        />
      )}

      {!status && (
        <Result
          status="error"
          title={title}
          subTitle={subTitle}
          extra={[
            <Button type="primary" key="console" onClick={handlerOnClick}>
              {btnText}
            </Button>,
          ]}
        />
      )}
    </>
  );
};

export default ResultContent;
