import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div
          className="social-media"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "30px",
            marginRight: "40px",
            marginLeft: "40px",
          }}
        >
          <a
            href="https://www.linkedin.com/in/alfonso-gabriel-b8733a23a"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-linkedin" style={{ fontSize: "3rem", color: "#FEFEFE"}}></i>
          </a>
          <a
            href="https://github.com/agabriele73"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fab fa-github" style={{ fontSize: "3rem", color: "#FEFEFE"}}></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
