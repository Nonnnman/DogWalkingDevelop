import React from 'react'
//import css
import "../styles/home.css"
import dogWalker from '../media/dog-walker.jpg';


const Home = () => {

	return (
		<main>
			<section className="hero">
				<img src={dogWalker} alt="Dog walker walking a dog" />
				<h2>Welcome to Beans</h2>
				<p>Are you looking for someone to walk your dog? Look no further! Our website connects dog owners with dog walkers who are students and have free time, love dogs and would want to walk them to earn revenue.</p>
				<a href="#" className="cta-button">Find a Dog Walker</a>
			</section>
		</main>
	)
}

export default Home
