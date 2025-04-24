import { createContext, useEffect, useState } from "react";
import Home from "./home";
import Nav from "./navbar";

export const TodoContext = createContext();

const App = () => {
  const [vtype, setVtype] = useState("card");
  const [cust, setCust] = useState({});
  const [fs, setFs] = useState(1);
  const [data, setData] = useState([]);
  const [delact, setDelact] = useState(false);
  const apiUrl = "https://todo-mern-api-hyzi.onrender.com/";

  // useEffect(() => {
  //   let copy = [...data].filter((el) => {
  //     if (el.id) {
  //       return el;
  //     }
  //   });
  //   if (copy.length !== data.length) {
  //     setData(copy);
  //   }
  // }, [data]);

  const logintok = async (tok) => {
    const res = await fetch(apiUrl + "logtok", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tok }),
    });
    const responce = await res.json();
    if (responce.status === "success") {
      setCust(responce.user);
      setData(responce.user.cards ? JSON.parse(responce.user.cards) : []);
      localStorage.setItem("tok", responce.user.token);
    }
  };

  useEffect(() => {
    const tok = localStorage.getItem("tok");
    if (tok) {
      logintok(tok);
      localStorage.removeItem("tok");
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
