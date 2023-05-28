import "./App.css";
import { useState, useEffect } from "react";

const API_BASE = "http://localhost:3001";

function App() {
  const [listings, setListings] = useState([]);
  const [newListing, setNewListing] = useState("");

  useEffect(() => {
    GetListings();

    console.log(listings);
  }, []);

  const GetListings = () => {
    fetch(API_BASE + "/listings")
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("error: ", err));
  };

  const book = () => {
    alert("sample");
  };

  const addProfile = async () => {
    const data = await fetch(API_BASE + "/dog_walker/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newListing,
      }),
    }).then((res) => res.json());

    setListings([...listings, data]);
  };

  return (
    <div className="App">
      <h1>Welcome</h1>
      <h3>Dog walkers listings</h3>

      <div className="listings">
        {listings.map((item) => (
          <div className="item" key={item._id} onClick={() => book()}>
            <div className="name info">{item.walker_name}</div>
            <div className="rating info">{item.rating}</div>
          </div>
        ))}
      </div>
      <div className="entry">
        <h4>Add profile</h4>
        <input
          type="text"
          className="create_profile"
          onChange={(e) => setNewListing(e.target.value)}
          value={newListing}
        />
        <div className="button" onClick={addProfile}>
          create
        </div>
      </div>
    </div>
  );
}

export default App;
