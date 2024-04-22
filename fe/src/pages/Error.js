import { useRouteError } from "react-router-dom";
import FillButton from "../components/Layouts/FillButton";

function ErrorPage() {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

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
}

export default ErrorPage;
