import { createContext, useEffect, useState } from "react";
import Home from "./home";
import Nav from "./navbar";

export const TodoContext = createContext();

// const dummy = [
//   {
//     id: 1,
//     title: "title 1",
//     details:
//       "Some wikis will present users with an edit button or link directly on the page being viewed.",
//     type: 0,
//   },
//   {
//     id: 2,
//     title: "title 2",
//     details:
//       "Some wikis will present users with an edit button or link directly on the page being viewed.",
//     type: 1,
//   },
//   {
//     id: 3,
//     title: "title 3",
//     details:
//       "Some wikis will present users with an edit button or link directly on the page being viewed.",
//     type: 2,
//   },
//   {
//     id: 4,
//     title: "title 4",
//     details:
//       "Some wikis will present users with an edit button or link directly on the page being viewed.",
//     type: 0,
//   },
//   {
//     id: 5,
//     title: "title 5",
//     details:
//       "Some wikis will present users with an edit button or link directly on the page being viewed.",
//     type: 1,
//   },
//   {
//     id: 6,
//     title: "title 6",
//     details:
//       "Some wikis will present users with an edit button or link directly on the page being viewed.",
//     type: 2,
//   },
// ];

const App = () => {
  const [vtype, setVtype] = useState("list");
  const [cust, setCust] = useState({});
  const [fs, setFs] = useState(1);
  const [data, setData] = useState([]);
  const [delact, setDelact] = useState(false);
  const apiUrl = "http://localhost:3000/";
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
