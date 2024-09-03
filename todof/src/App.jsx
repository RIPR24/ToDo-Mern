import { createContext, useEffect, useState } from "react";
import Home from "./home";
import Nav from "./navbar";

export const TodoContext = createContext();


const App = () => {
  const [vtype, setVtype] = useState("list");
  const [cust, setCust] = useState({});
  const [fs, setFs] = useState(1);
  const [data, setData] = useState([]);
  const [delact, setDelact] = useState(false);
  const apiUrl = "https://todo-mern-api-hyzi.onrender.com";
  let [idc, setIdc] = useState(10);

  const login = async (usr) => {
    const res = await fetch(apiUrl + "login", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(usr),
    });
    const responce = await res.json();

    if (responce.status === "success") {
      setCust(responce.user);
      setData(responce.user.cards?.data || []);
      setIdc(responce.user.cards?.idc || 0);
    }
  };

  useEffect(() => {
    const ur = localStorage.getItem("user-det");

    if (ur) {
      const usr = JSON.parse(ur);
      if (usr?.username) {
        login(usr);
      }
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        vtype,
        setVtype,
        setCust,
        cust,
        fs,
        setFs,
        data,
        setData,
        delact,
        setDelact,
        apiUrl,
        idc,
        setIdc,
      }}
    >
      <div style={{ display: "grid", placeContent: "center" }}>
        <Nav />
        <Home />
      </div>
    </TodoContext.Provider>
  );
};

export default App;
