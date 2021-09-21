import React from 'react'
import Icon_Github from "../assets/images/Icon-Github.svg";
import Icon_Yammer from "../assets/images/Icon-Yammer.svg";
import Icon_Confluence from "../assets/images/Icon-Confluence.svg";
import {NavLink} from 'react-router-dom';

export const Footer = () => {
    return (
      <div className="col-3 footer">
      <div className="social-media text-center page-footer">
        <div className="social-tag text-muted">Socialize With Us</div>
        <a href="https://github.build.ge.com/DC-Admin-Portal/dc-portal-mirror"><img alt="" className="img-fluid px-2 github-icon" src={Icon_Github} /></a>
        <img alt="" className="img-fluid px-2 yammer-icon" src={Icon_Yammer} />
        <img alt="" className="img-fluid px-2 confluence-icon" src={Icon_Confluence} />
      </div>
      <div className="footer-copyright text-center text-muted mt-2">
        © 2021 GENERAL ELECTRIC
      </div>
    </div>
    )
}
