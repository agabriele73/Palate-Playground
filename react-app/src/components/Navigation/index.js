import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div>

		<ol className="homebutton-profile">
			<li>
				<NavLink exact to="/" className="home-button">
					<img className="logo" src="https://i.imgur.com/9kVqdpa.png" alt="logo" style={{width: '40px', height: '40px', marginRight: '10px'}} />
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
			<NavLink to="/recipes">Recipes</NavLink>
			<NavLink to="/recipes/chicken">Chicken</NavLink>
			<NavLink to="/recipes/beef">Beef</NavLink>
			<NavLink to="/recipes/seafood">Seafood</NavLink>
			<NavLink to="/recipes/meat-less">Meat-less</NavLink>
		</nav>
		</div>
	);
}

export default Navigation;