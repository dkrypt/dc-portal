import { useState } from 'react';

const useCookie = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const match = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    let existingValue = match ? match[2] : defaultValue;
    try {
      existingValue = JSON.parse(existingValue);
    } catch (_) {}
    return existingValue;
  });
  const setCookie = (value, options) => {
    const cookieOptions = {
      expires: 0,
      domain: '',
      path: '',
      secure: false,
      httpOnly: false,
      maxAge: 0,
      sameSite: '',
      ...options
    };
    setValue(value);
    if (Array.isArray(value) || Object.prototype.toString.call(value) === '[object Object]') {
      value = JSON.stringify(value);
    }
    let cookie = `${key}=${value}`;
    if (cookieOptions.expires) {
      let date = new Date();
      date.setTime(date.getTime() + 1000 * cookieOptions.expires)
      cookie += `; Expires=${date.toUTCString()}`;
    }
    if (cookieOptions.path) {
      cookie += `; Path=${cookieOptions.path}`;
    }
    if (cookieOptions.domain) {
      cookie += `; Domain=${cookieOptions.domain}`;
    }
    if (cookieOptions.maxAge) {
      cookie += `; Max-Age=${cookieOptions.maxAge}`;
    }
    if (cookieOptions.sameSite) {
      cookie += `; SameSite=${cookieOptions.sameSite}`;
    }
    if (cookieOptions.secure) {
      cookie += `; Secure`;
    }
    if (cookieOptions.httpOnly) {
      cookie += `; HttpOnly`
    }
    document.cookie = cookie;
  }
  const clearCookie = () => {
    setCookie('', {expires: -3600});
    setValue(defaultValue);
  }
  return [value, setCookie, clearCookie];
};

export default useCookie;
