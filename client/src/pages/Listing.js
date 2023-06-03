import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ListingPage = () => {
  const [users, setUsers] = useState([]);
  const [priceFilter, setPriceFilter] = useState(0);
  const [sortType, setSortType] = useState("name");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const visit = (username) => {
    navigate(`/WalkerProfile/${username}`);
  };

  const filteredUsers = users.filter((user) => user.price < priceFilter);

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortType === "price") {
      return a.price - b.price;
    } else if (sortType === "rating") {
      return b.rating - a.rating;
    } else {
      return a.username.localeCompare(b.username);
    }
  });

  return (
    <div>
      <h1>Users</h1>
      <label htmlFor="priceFilter">Price less than:</label>
      <input
        type="number"
        id="priceFilter"
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
      />
      <br />
      <label htmlFor="sortType">Sort by:</label>
      <select
        id="sortType"
        value={sortType}
        onChange={(e) => setSortType(e.target.value)}
      >
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="rating">Rating</option>
      </select>
      <br />
      {sortedUsers.map((user) => (
        <div key={user.username}>
          <button className="listItemButton" onClick={() => visit(user.username)}>
            <h2>{user.username}</h2>
            <p>Price: {user.price}</p>
            <p>Rating: {user.rating}/5</p>
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListingPage;