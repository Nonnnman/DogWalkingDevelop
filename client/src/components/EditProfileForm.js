import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditForm = (username) => {

  const [price, setPrice] = useState(0);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();


  const handleEditProfile = async (e) => {
    e.preventDefault();

    await fetch(`/api/user/${username.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price, bio }),
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated");
        navigate(`/WalkerProfile/${username.username}`);
      }
    }
    );

  };

  return (
    <div>

      <form className="login" onSubmit={handleEditProfile}>
      <h3>Edit Profile</h3>
      <label>What do you charge per walk ?</label>
      <input 
        type="number"
        min="300" 
        step="100"
        onChange={(e) => setPrice(e.target.value)}
        />
        <label>Tell us about yourself</label>
        <textarea className="bioField"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <br/>

        <button >Submit</button>
      </form>

      </div>
  );
};

export default EditForm;
