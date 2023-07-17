import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);
	const recipes = useSelector(state => state.recipe.recipes);
	const [searchQuery, setSearchQuery] = useState('');

	const filteredRecipes = Object.values(recipes).filter(recipe =>
		recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	return (
		<div className='nav-container'>

		<ol className="homebutton-profile">
			<li>
				<NavLink exact to="/" className="home-button">
					<img className="logo" src="https://i.imgur.com/9kVqdpa.png" alt="logo"  />
					<h1>Palate PlayGround</h1>
				</NavLink>
			</li>
			{isLoaded && (
				<li>
					<ProfileButton user={sessionUser} />
				</li>
			)}
		</ol>
		<nav className="nav-bar">
			{/* <input 
				type="text"
				placeholder="Search..."
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				className="search-bar"
			/> */}
			<NavLink to="/recipes">Recipes</NavLink>
			<NavLink to="/recipes/chicken">Chicken</NavLink>
			<NavLink to="/recipes/beef">Beef</NavLink>
			<NavLink to="/recipes/seafood">Seafood</NavLink>
			<NavLink to="/recipes/vegetarian">Vegetarian</NavLink>
		</nav>
		</div>
	);
}

export default Navigation;