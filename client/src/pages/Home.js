import React from 'react'
//import css
import "../styles/home.css"
import dogWalker from '../media/dog-walk.jpg';


const Home = () => {

	return (
		<main>
            <img src={dogWalker} alt="Dog walker walking a dog" />
			<div className="hero">
				<h2>Welcome to Beans</h2>
				<p>Are you looking for someone to walk your dog? Look no further! Our website connects dog owners with dog walkers who are students and have free time, love dogs and would want to walk them to earn revenue.</p>
				<a href="/list" className="cta-button">Find a Dog Walker</a>
			</div>
		</main>
	)
}

export default Home
