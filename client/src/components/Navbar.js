import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import logo from '../media/pawprint.png';
import '../styles/navbar.css';



const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const isWalker = user && user.userType === "walker";
  const isOwner = user && user.userType === "owner";


  const handleClick = () => {
    logout();
  };

	return (
		<header>
			<div className="container">
				<div className="homeContainer" onClick={() => window.location.href='/'} >
          <h1>Beans</h1>
					<img src={logo} alt="Beans Logo" className="logo" />
				</div>
				<Link to="/list" className="findLink">
					<h2>Find a Dog-Walker</h2>
				</Link>
				{isWalker && (
					<div className="linksContainer">
						<Link to={"/WalkerProfile/"+user.username} className="profileLink">
							<h2>Profile</h2>
						</Link>
						<Link to={"/WalkerProfile/"+user.username+"/requests"} className="requestsLink">
							<h2>Requests</h2>
						</Link>
				 </div>
			 )}
			 {isOwner && (
				 <div className="linksContainer">
					 <Link to={"/OwnerProfile/"+user.username} className="profileLink">
						 <h3>Profile</h3>
					 </Link>
					 <Link to={"/OwnerProfile/"+user.username+"/requests"} className="requestsLink">
						 <h3>Requests</h3>
					 </Link>
				 </div>
			 )}
			 <nav>
				 {user && (
					 <div className="userContainer">
						 <h3 className="help">{user.username}</h3>
						 <button onClick={handleClick} className="logoutButton">Log out</button>
					 </div>
				 )}
				 {!user && (
					 <div className="authContainer">
						 <Link to="/login" className="loginLink">
							<h2>login</h2>
						 </Link>
						 <Link to="/signup" className="signupLink">
							<h2>signup</h2>
						</Link>
					 </div>
				 )}
			 </nav>
		 </div>
     </header>
  );
};

export default Navbar;