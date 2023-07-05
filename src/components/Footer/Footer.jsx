import React from "react";
import "./Footer.css";
import { ImGithub } from "react-icons/im";
import { SiLinkedin } from "react-icons/si";
import { BsInstagram, BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

export const Footer = () => {
  const copyrightYear = new Date().getFullYear();

  return (
    <div className="footer">
      <small> &copy; {copyrightYear} Swaroop Chandra </small>
      <div className="social-links">
        <Link to="https://www.instagram.com/swapo_chan/" target="_blank">
          <BsInstagram />
        </Link>
        <Link to="https://github.com/swaroop-chandra" target="_blank">
          <ImGithub />
        </Link>
        <Link to="https://www.linkedin.com/in/swaroop-chandra/" target="_blank">
          <SiLinkedin />
        </Link>
      </div>
    </div>
  );
};
