import React from 'react'
import Icon_Github from "../assets/images/Icon-Github.svg";
import Icon_Yammer from "../assets/images/Icon-Yammer.svg";
import Icon_Confluence from "../assets/images/Icon-Confluence.svg";
import {NavLink} from 'react-router-dom';

export const Footer = () => {
    return (
    <div className="footer">
        <div className="social-media page-footer">
          <div className="social-tag text-muted">Socialize With Us</div>
          <div className="social-media-bar">
            <a href='https://github.build.ge.com/DC-Admin-Portal/dc-portal-mirror'>
                <img alt="" className="img-fluid px-2 img-size-2" src={Icon_Github} />
            </a>
            <a href='#'>
                <img alt="" className="img-fluid px-2 img-size-2" src={Icon_Yammer} />
            </a>
            <a href='#'>
                <img alt="" className="img-fluid px-2 img-size-2" src={Icon_Confluence} />
            </a>
          </div>
        </div>
        <div className="text-muted mt-2 text-meta">
          © 2021 GENERAL ELECTRIC
        </div>
    </div>
    )
}
