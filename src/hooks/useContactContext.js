import { useContext } from "react";
import ContactContext from "../contexts/ContactContext";

const useContactsContext = () => useContext(ContactContext);

export default useContactsContext;