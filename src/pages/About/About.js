import React from 'react';
import './About.css'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
 

function About () {
    const {currentUser} = useContext(AuthContext);

	return <section className='about_us_wrap'>
		<div className='about_container'>
			<div className="about_us_inner">
				<figure className='figure_wrap'>
					<img src="https://assets.nicepagecdn.com/d2cc3eaa/2713395/images/544444.jpg" alt="" />
				</figure>
				<div className='content_wrap'>
					<h3>About us</h3>
					<p>Welcome to Beezbag, the buzzing chat website that connects people from all corners of the world! We are thrilled to provide you with a platform where you can engage in meaningful conversations, make new friends, and explore a diverse range of topics.</p>
					<p>"Introducing our one-to-one chat module, a powerful and intuitive communication tool designed to enhance your online interactions. With our chat module, you can engage in real-time conversations with other users, fostering seamless communication and collaboration.</p>
					<h6>Our Mission</h6>
					<p>At Beezbag, our mission is to foster connections and promote positive interactions in a safe and inclusive environment. We believe that genuine conversations have the power to bring people together, break down barriers, and create a sense of unity in our increasingly interconnected world.</p>
					<p>User Profiles: Create your own unique profile and showcase your personality. Add a profile picture, share your hobbies and interests, and let others get to know you better.</p>
					<p>Private Messaging: Connect with other users on a one-on-one basis</p>
					{currentUser && <Link className='chat_cta_link' to="/chat">Chat Now</Link>}
				</div>
			</div>
		</div>	
	</section>
}
export default About;
