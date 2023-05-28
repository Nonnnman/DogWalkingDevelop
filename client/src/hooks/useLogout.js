import { useAuthContext } from "./useAuthContext";
import { useListingsContext } from "./useListingsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: listingDispatch } = useListingsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });

    listingDispatch({ type: "SET_LISTING", payload: null });
  };

  return { logout };
};
