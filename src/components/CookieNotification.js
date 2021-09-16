import React, { useEffect, useState } from "react";

export const CookieNotification = () => {
  const [cookieNotificationKey, setCookieNotificationKey] = useState('readCookieNotification');

  useEffect(() => {
    let isReadCookieNotification = getCookie(
      cookieNotificationKey
    );
    if (isReadCookieNotification != "Y") {
      setTimeout(() => {
        window.showCookieInfo();
      }, 500);
    }
  }, [])
  
  /* istanbul ignore next */
  const getCookie = (name) => {
    var cookieName = name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(cookieName) == 0) {
        return c.substring(cookieName.length, c.length);
      }
    }
    return "N";
  }
  
  /* istanbul ignore next */
  const readCookieNotification = (e) => {
    document.cookie = cookieNotificationKey + "=Y";
    window.hideCookieInfo();
  }

  /* istanbul ignore next */
  const readCookieNotificationIgnore = () => {
    window.hideCookieInfo();
  }
  
  /* jshint ignore:start */
  /* istanbul ignore next */
  return (
    <div id="cookieConsent">
      <div
        id="closeCookieConsent"
        onClick={(event) => readCookieNotificationIgnore(event)}
      >
        x
      </div>
      <div className="row">
        <div className="col-sm-10">
          Digital Connect Portal uses cookies to store information on your
          computer. Some are essential to make our site work, others help us
          improve the user experience. By using the site, you consent to the
          placement of these cookies.
        </div>
        <div className="col-sm-2">
          <a
            className="cookieConsentOK"
            onClick={(event) => readCookieNotification(event)}
          >
            Allow cookies.
          </a>
        </div>
      </div>
    </div>
  );
  /* jshint ignore:end */
};