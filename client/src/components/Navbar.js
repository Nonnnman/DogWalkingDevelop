import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

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
        <Link to="/">
          <h1>Beans</h1>
        </Link>
        <Link to="/list">
          <h2>Dog Walker's List</h2>
        </Link>
        {isWalker && (
        <div className="linksContainer">
          <Link to={"/WalkerProfile/"+user.username}>
            <h3>Profile</h3>
          </Link>
          <Link to={"/WalkerProfile/"+user.username+"/requests"}>
            <h3>Requests</h3>
          </Link>
        </div>
        )}
        {isOwner && (
        <div className="linksContainer">
          <Link to={"/OwnerProfile/"+user.username}>
            <h3>Profile</h3>
          </Link>
          <Link to={"/OwnerProfile/"+user.username+"/requests"}>
            <h3>Requests</h3>
          </Link>
        </div>
        )}
        <nav>
          {user && (
            <div>
              <span>{user.username}</span>
              <button onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
