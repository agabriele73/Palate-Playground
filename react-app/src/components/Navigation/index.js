import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
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
	);
}

export default Navigation;