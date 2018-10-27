import React from 'react';


import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Header from './Header';
import NavBar from './NavBar/NavBar';


configure({adapter: new Adapter});

describe('<Header/>', function () {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Header />)
	})

	it('should render navigation if user isn`t authed', function () {
		expect(wrapper.find(NavBar)).toHaveLength(0)
	});

	it('should render navigation if user is authed', function () {
		wrapper.setProps({isAuthed: true})
		expect(wrapper.find(NavBar)).toHaveLength(1)
	});

})