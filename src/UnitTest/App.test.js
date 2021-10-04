import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import fetchMock from 'fetch-mock';

import App from '../app';
import DCSC from "../dcsc";

configure({adapter: new Adapter()});

describe('Testing from App.test.js <DCSC />', () => {

    
    it('should render Header component only once', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrDCSCer = shallow(<App />, { disableLifecycleMethods: true });
        expect(wrDCSCer.find(DCSC).length).toBe(1);
    });

    // Will be used in future

    /* it('should render the DCSC component', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrDCSCer = shallow(<DCSC />, { disableLifecycleMethods: true });
        expect(wrDCSCer).toBeTruthy();
    }); */

    /* it('should render Navbar component only once', () => {
        fetchMock.get(`*`, JSON.stringify('SECONDGETOBJ'), { overwriteRoutes: false });
        const wrDCSCer = shallow(<DCSC />, { disableLifecycleMethods: true });
        expect(wrDCSCer.find(Sidebar).length).toBe(1);
    }); */

});
