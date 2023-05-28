import { useEffect } from "react";
import { useListingsContext } from "../hooks/useListingsContext";

const Listing = () => {
  const { listings, dispatch } = useListingsContext();

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

  return (
    <div>
      <div>
        {listings &&
          listings.map((item) => <h4 key={item._id}>{item.username}</h4>)}
      </div>
    </div>
  );
};

export default Listing;
