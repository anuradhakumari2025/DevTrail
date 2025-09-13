import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();

  const [entries, setEntries] = useState([]);
  const [tags,setTags] = useState([])

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "",
    content: "",
    visibility: "",
    tags: [],
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = "http://localhost:5000/api";

// Fetch journals function
  const fetchJournals = async () => {
    try {
      const res = await axios.get(`${backendUrl}/journals/get`);
      // console.log(res.data.journals);
      setEntries(res.data.journals);
    } catch (error) {
      console.log("Error fetching journals:", error);
    }
  };

  //Fetch tags function
  const fetchTags = async () => {
    try {
      const res = await axios.get(`${backendUrl}/tags/get`);
      // console.log(res.data.tags);
      setTags(res.data.tags);
    } catch (error) {
      console.log("Error fetching tags:", error);
    }
  }

  //data to be exported as value
  const data = {
    backendUrl,
    navigate,
    user,
    setUser,
    loading,
    setLoading,
    entries,
    setEntries,
    formData,
    setFormData,
    tags,
    setTags,
  };

  // Fetch user profile data function
  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backendUrl}/auth/me`, {
        withCredentials: true,
      });
      if (res.statusText == "OK") {
        console.log(res.data)
        setUser(res.data);
        setLoading(false);
      }
    } catch (error) {
      navigate("/login")
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchJournals();
    fetchTags();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
