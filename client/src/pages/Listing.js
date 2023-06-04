import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pricePic from '../media/price-tag.png';
import starPic from '../media/star.png';
import '../styles/listing.css';

const ListingPage = () => {
  const [users, setUsers] = useState([]);
  const [priceFilter, setPriceFilter] = useState(2000);
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
    <div className="pageContainer">
      <div className="listingContainer">
        <h2>Users</h2>
        <div className="filterContainer">
          <div className="filter">
            <label htmlFor="priceFilter">Price less than:</label>
            <input
              //starts at 2000
              step={100}
              type="number"
              id="priceFilter"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            />
          </div>
          <div className="sort">
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
          </div>

        </div>
        <br />
        {sortedUsers.map((user) => (
          <div key={user.username} className="userContainer">
            <button className="listItemButton" onClick={() => visit(user.username)}>
              <h3>{user.username}</h3>
              <div className="userInfo">
                <div className="infoItem">
                  <img src={pricePic} alt="Price icon" className="infoIcon"/>
                  <p>Price: {user.price} huf </p>
                </div>
                <div className="infoItem">
                  <img src={starPic} alt="Rating icon" className="infoIcon"/>
                  <p>Rating: {user.rating}/5</p>
                </div>
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingPage; 