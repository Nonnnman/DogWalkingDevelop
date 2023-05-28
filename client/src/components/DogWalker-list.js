import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function DogWalkersList() {
  const [dogWalkers, setDogWalkers] = useState([]);

  useEffect(() => {
    fetchDogWalkers();
    const mockDogWalkers = [
      { id: 1, name: "Dog Walker 1", rating: 4.5 },
      { id: 2, name: "Dog Walker 2", rating: 4.2 },
      { id: 3, name: "Dog Walker 3", rating: 4.7 },
    ];

    setDogWalkers(mockDogWalkers);
  }, []);

  async function fetchDogWalkers() {
    try {
      const response = await axios.get("/dogwalkers");
      setDogWalkers(response.data);
    } catch (error) {
      console.error("Error fetching dog walkers:", error);
    }
  }

  return (
    <div>
      <h2>Dog Walkers List</h2>
      <ul>
        {dogWalkers.map((dogWalker) => (
          <li key={dogWalker._id}>
            <Link to={`/dogwalkers/${dogWalker._id}`}>{dogWalker.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DogWalkersList;
