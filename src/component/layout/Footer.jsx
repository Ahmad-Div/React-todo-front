import React from "react";

const Footer = () => {
  return (
    <footer className="footer w-100 flex flex-column justify-center align-center gap-1">
      <p>Ahmad Software all rights received &copy; {new Date().getFullYear()}</p>
      <div className="socials flex flex-row justify-center align-center flex-wrap w-100 gap-4">
        <span>
          <a target="_blank" href="https://www.facebook.com/profile.php?id=100046621757093">
            <i className="fa-brands fa-facebook"></i>
          </a>
        </span>
        <span>
          <a target="_blank" href="https://www.youtube.com/channel/UCAiNkVKFGi1QRZARjyG2yuw">
            <i className="fa-brands fa-youtube"></i>
          </a>
        </span>
        <span>
          <a target="_blank" href="https://github.com/Ahmad-Div">
            <i className="fa-brands fa-github"></i>
          </a>
        </span>

        <span>
          <a target="_blank" href="https://www.linkedin.com/in/ahmad-sattar-50519022a/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
