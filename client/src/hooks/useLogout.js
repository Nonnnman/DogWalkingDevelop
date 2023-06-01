import { useAuthContext } from "./useAuthContext";
import { useListingsContext } from "./useListingsContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: listingDispatch } = useListingsContext();
  const Navigate = useNavigate();


  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    Navigate("/");

    listingDispatch({ type: "SET_LISTING", payload: null });
  };

  return { logout };
};
