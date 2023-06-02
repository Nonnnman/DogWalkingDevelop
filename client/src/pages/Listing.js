import { useEffect } from "react";
import { useListingsContext } from "../hooks/useListingsContext";
import { useNavigate } from "react-router-dom";

const Listing = () => {
  const { listings, dispatch } = useListingsContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const response = await fetch("/api/user/", {
        headers: {},
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LISTING", payload: json });
      }
    };
    fetchListings();
  }, [dispatch]);

  const visit = (username) => {
    navigate("/WalkerProfile/" + username);
  };

  return (
    <div>
      <div>
        {listings &&
          listings.map((item) =>
           <button onClick={() => visit(item.username)} key={item._id}>{item.username}</button>
        )}
      </div>
    </div>
  );
};

export default Listing;
