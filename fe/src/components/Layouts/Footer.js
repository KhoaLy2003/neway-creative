import React from "react";
import "./Footer.css";
import "../../assets/root.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="inner-content">
              <p>
                IDEASY - Lịch ý tưởng ©{new Date().getFullYear()}
                {/* <a rel="nofollow noopener" href="#">
                  Neway Creative
                </a> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
