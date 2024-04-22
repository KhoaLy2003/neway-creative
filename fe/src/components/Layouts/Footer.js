import React from "react";
import './Footer.css';
import "../../assets/root.css";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="inner-content">
              <p>
                Copyright &copy; 2020 Sixteen Clothing Co., Ltd. - Design:{" "}
                <a
                  rel="nofollow noopener"
                  href="#"
                  target="_blank"
                >
                  TemplateMo
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
