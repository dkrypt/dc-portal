import {JSDOM} from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost/',
  });
global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
global.sessionStorage = dom.window.sessionStorage;