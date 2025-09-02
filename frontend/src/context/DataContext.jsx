import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);
  const [selectedParentTag, setSelectedParentTag] = useState("");
  const [selectedChildTag, setSelectedChildTag] = useState("");

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = "http://localhost:5000/api";

  const fetchJournals = async () => {
    try {
      const res = await axios.get(`${backendUrl}/journals/get`);
      setEntries(res.data.journals);
    } catch (error) {
      console.log("Error fetching journals:", error);
    }
  };

  const data = {
    backendUrl,
    navigate,
    user,
    setUser,
    loading,
    setLoading,
    entries,
    setEntries,
    selectedChildTag,
    setSelectedChildTag,
    selectedParentTag,
    setSelectedParentTag,
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/me`, {
        withCredentials: true,
      });
      if (res.statusText == "OK") {
        setUser(res.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchJournals();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
