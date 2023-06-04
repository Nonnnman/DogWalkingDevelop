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
				<p>Beans is a website that connects dog owners with student dog walkers who love dogs and want to earn some extra money. Whether you need a one-time walk or a regular schedule, you can find your perfect match on Beans.</p>
				<a href="/list" className="cta-button">Find a Dog Walker</a>
			</div>
		</main>
	)
}

export default Home
