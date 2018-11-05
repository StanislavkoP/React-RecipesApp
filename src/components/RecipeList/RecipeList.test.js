/* import React from 'react';

import RecipeList from './RecipeList';
import RecipeItem from '../RecipeItem/RecipeItem/RecipeItem.js';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';



configure({adapter: new Adapter});


describe('List with recipes', function () {
	let wrapper;

	beforeEach(function () {
		wrapper = shallow(<RecipeList/>)
	});

	it('test', function() {
		wrapper.setProps({
			recipes: [{
				guide:"",
				id:"-LPqUyf8NfxsMMGkbkFH",
				ingredients:[{

				}]
				0
				existence: 
				true
				name: 
				"2 картохи"
				1
				existence: 
				true
				name: 
				"Сосиска"
				2
				existence: 
				true
				name: 
				"Майнонез"
				title: 
				"Стасюнька писюнька"
				
				
			}]
		})

		expect(wrapper.find(<RecipeItem />)).toHaveLength(1)
	})
}) */