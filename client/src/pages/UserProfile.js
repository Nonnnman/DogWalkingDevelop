import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function UserProfile() {

  const { username } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
 const { user: currentUser } = useAuthContext();

  useEffect(() => {
    fetch(`/api/user/${username}`)
      .then((response) =>{
        if (response.ok){
            return response.json();
        } 
        else {       
             navigate("/");
        }
      }) 
      .then((data) => {
            if (data){
                setUser(data.username);
            }
      });


  }, [username, navigate]);

  const editFlag = currentUser && currentUser.username === username

  if (!user) {
    return <div></div>;
  }

  return (
    <div>
      <h1>{user}</h1>
      
      { editFlag && (
        <button
        onClick={() => {
            navigate("/UserProfile/:username/editProfile");
        }}
        >
        Edit Profile
        </button>
        )
    }
    </div>
  );
}

export default UserProfile;