import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditForm = (username) => {

  const [price, setPrice] = useState(0);
  const [bio, setBio] = useState("");

  const navigate = useNavigate();


  const handleEditPrice = async (e) => {
    e.preventDefault();

    await fetch(`${window.backend}/api/user/${username.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated");
        navigate(`/WalkerProfile/${username.username}`);
      }
    }
    );

  };

  const handleEditBio = async (e) => {
    e.preventDefault();

    await fetch(`${window.backend}/api/user/${username.username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio }),
    }).then((response) => {
      if (response.ok) {
        alert("Profile updated");
        navigate(`/WalkerProfile/${username.username}`);
      }
    }
    );

  };

  return (
    <div className="pageContainer">
      <div className="editProfileContainer">
        <h2>Edit your profile</h2>
        <div className="editProfileBox">
          <form className="priceForm" onSubmit={handleEditPrice}>
          <label>What do you charge per walk ?</label>
          <input 
            type="number"
            min="300" 
            step="100"
            onChange={(e) => setPrice(e.target.value)}
            />
            <br/>
            <button >Submit</button>
          </form>

          <form className="bioForm" onSubmit={handleEditBio}>
          <label>Tell us about yourself</label>
          <textarea className="bioField"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <br/>
          <button >Submit</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default EditForm;
