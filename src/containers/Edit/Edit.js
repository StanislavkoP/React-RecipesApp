import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';


import classes from './Edit.css';

import Spinner from '../../components/Spinner/Spinner';
import Input from '../../components/Input/Input';
import Textarea from '../../components/Textarea/textarea';
import Button from '../../components/Button/Button';
import Ingredients from '../../components/Ingredients/Ingredients'

class Edit extends Component {
	state = {
		recipeId: null,
		recipe: null,
		valueNewIngredientName: '',
		isChanging: false,
		isLoaded: false,
		isChanged: false,
	}

	componentWillMount() {
		if (this.props.dashboardRecipes.length === 0) {
			this.loadRecipeFromDatabase(this.props.match.params.id);

		} else {
			const recipeFromDahboard = this.props.dashboardRecipes.find(elem => elem.id === this.props.match.params.id);
			this.setState({
				recipe: recipeFromDahboard,
				isLoaded: true,
			})
		}

		if(this.state.recipeId === null) {
			this.setState({recipeId: this.props.match.params.id})
		}

	}


	componentDidUpdate(prevProps, prevState) {
		if (this.state.recipe.title === '' && this.state.isChanging === false) {
			this.setState({
				recipe: {
					...prevState.recipe,
					title: 'Без названия'
				}
			})
		}

	}

	loadRecipeFromDatabase = (idRecipe) => {
		axios.get(`https://react-recipes-app-596c7.firebaseio.com/recipes/${idRecipe}.json?auth=WRocQv8wYnO9SMcPjJFWqqfnbrEp3h0tTGttOzy9`)
			.then(response => {
				this.setState({
					recipe: response.data,
					isLoaded: true
				})
			})
			.catch(error => {
				console.log(error)
			})
	}



	isChanging = (event) => {
		this.setState({
			isChanging: false
		})
	}

	changeTitle = (event) => {
		this.setState({
			recipe: {
				...this.state.recipe,
				title: event.target.value
			},
			isChanging: true,
			isChanged: true
		})

	}

	changeGuide = (event) => {
		this.setState({
			recipe: {
				...this.state.recipe,
				guide: event.target.value
			},
			isChanged: true
		})
	}

	onWriteIngredientName = (event) => {
		this.setState({
			valueNewIngredientName: event.target.value,
		})
	}

	saveRecipe = () => {
		this.requestSaveChanges().then( () => {
			this.setState({
				isChanged: false
			})
		})
	
	}

	requestSaveChanges() {
		this.setState({
			isLoaded: false
		})
		return axios.patch(`https://react-recipes-app-596c7.firebaseio.com/recipes/${this.props.userId}/${this.state.recipeId}.json?auth=WRocQv8wYnO9SMcPjJFWqqfnbrEp3h0tTGttOzy9`, this.state.recipe)
			.then(response => {
				this.setState({
					isLoaded: true
				})
			})
			.catch(error => {
				console.log(error)
			})

	}


	deleteRecipe = () => {
		axios.delete(`https://react-recipes-app-596c7.firebaseio.com/recipes/${this.props.userId}/${this.state.recipeId}.json?auth=WRocQv8wYnO9SMcPjJFWqqfnbrEp3h0tTGttOzy9`)
		.then(response => {
			this.props.history.push('/')
		})
		.catch(err => {
			console.log(err);
		})


	}

	addIngredient = () => {
		let listIngredients = this.state.recipe.ingredients;
		const ingredientNameInputValue = this.state.valueNewIngredientName

		if (listIngredients === undefined || null) {
			listIngredients = []
		};

		
		if ( ingredientNameInputValue.trim() !== '' ) {
			this.setState({
				recipe: {
					...this.state.recipe,
					ingredients: [
						...listIngredients,
						{
							existence: false,
							name: this.state.valueNewIngredientName,
						}
					]
				},
				valueNewIngredientName: '',
				isChanged: true
			});
		 }



	}

	deleteIngredient = indexIngredient => {
		const filteredIngredients = this.state.recipe.ingredients.filter((elem, index) => {
			return index !== indexIngredient
		});

		this.setState({
			recipe: {
				...this.state.recipe,
				ingredients: [
					...filteredIngredients
				]
			},
			isChanged: true
		});
	}

	back = () => {
		if(this.state.isChanged) {
			let saveChanges = window.confirm('Сохранить изменения?');
			if(saveChanges === true) {
				this.requestSaveChanges()
				.then( () => {
					this.setState(
						{ 
							isChanged: false,
							isLoaded: true
						}, 
						() => {
							this.props.history.push('/')
						}
					)
				})
			} 
		} else {
			this.props.history.push('/')
		}
	}

	changeExistenceIngredient = (ingredient, indexIngredient) => {
		const newIngredient = {existence: !ingredient.existence, name: ingredient.name}

		const newListIngredients = [...this.state.recipe.ingredients];
		newListIngredients.splice(indexIngredient, 1 , newIngredient);

		this.setState((prevState) => {
			return {
				recipe: {
					...prevState.recipe,
					ingredients: [...newListIngredients]
				},
				isChanged: true
			}
		}) 
	}



	render() {

		let edit =  <Spinner/>;

		if (this.state.isLoaded) {

			edit = ( < div className = {classes.container} >
			
					<Input 
						value = {
							this.state.recipe.title
						}
						isChanging = {
							(event) => this.isChanging(event)
						}
						changed = {
							(event) => this.changeTitle(event)
						}
					/>

					<Textarea 
						value = {
							this.state.recipe.guide
						}
						changed = {
							(event) => this.changeGuide(event)
						}
					/>

					<Ingredients 
						ingredients = {
							this.state.recipe.ingredients
						}
						deleteIngredient = {
							(indexIngredient) => this.deleteIngredient(indexIngredient)
						}

						changeExistenceIngredient = { (item,indexIngredient) => this.changeExistenceIngredient(item,indexIngredient) }
					/>


					<Input
						placeholder="Введите название ингридиента"
						style={{
							fontSize: "19px",
							border: '1px solid #fff',
							padding: "6px"
						}}
						value = {
							this.state.valueNewIngredientName
						}
						changed = {
							(event) => this.onWriteIngredientName(event)
						}
					/>

					<Button 
						classes = 'AddIngredient'
						clicked = {
							() => this.addIngredient()
						} 
					>
						Добавить ингридиент 
					</Button>

					<Button classes = 'AddRecipe'
						clicked = {
							() => this.saveRecipe()
						}
						disabled = { !this.state.isChanged }
					>
						Сохранить 
					</Button>

					<Button 
						clicked = {
							() => this.deleteRecipe()
						}
						classes = 'DeleteRecipe' 
					>
						Удалить рецепт 
					</Button>

					<Button 
						classes = 'BackToDashboard'
						clicked = {
							() => this.back()
						}
					>
						Назад 
					</Button> 
				</div>
			)
		}

		return ( <React.Fragment >
					{edit} 
				</React.Fragment>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		dashboardRecipes: state.dashboard.recipes,
		userId: state.auth.userId
	}
}


export default connect(mapStateToProps)(Edit)