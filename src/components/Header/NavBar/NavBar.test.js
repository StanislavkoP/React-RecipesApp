import React from 'react';


import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavBar from './NavBar';
import NavItem from './NavItem/NavItem';

configure({adapter: new Adapter()});

describe('<Navigation/>', function () {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<NavBar currentPath='/recipe/'/>)

	})

	it('should render <NavItem link="/authLogOut">Выйти</NavItem> if user is authed', function () {
		wrapper.setProps({isAuthed: true})
		expect(wrapper.contains(<NavItem link="/authLogOut">Выйти</NavItem>)).toEqual(true)
	});

	

	it('should render <NavItem link="/authLogOut">Выйти</NavItem> if user isn`t authed', function () {
		wrapper.setProps({isAuthed: false})
		expect(wrapper.contains(<NavItem link="/auth">Войти</NavItem>)).toEqual(true)
	});
})