import FillButton from "../../components/Layouts/FillButton";

const ErrorPage = ({
  title = "An error occurred!",
  message = "Something went wrong!",
}) => {
  return (
    <>
      <div className="container text-center mt-5">
        <div className="row">
          <div className="col-4 mx-auto">
            <h1>{title}</h1>
            <p>{message}</p>
            <FillButton href={"/"} children={"Back to home"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ErrorPage;
