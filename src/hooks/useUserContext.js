import { useContext } from "react";
import UserContext from "../contexts/UserContext";

function useUserContext () {
    return useContext(UserContext);
}

export default useUserContext;