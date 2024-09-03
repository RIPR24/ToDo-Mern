import React, { useContext, useState } from "react";
import { TodoContext } from "../App";
import { motion } from "framer-motion";

const Log = ({ setPop }) => {
  const { cust, setCust, setData, apiUrl, setIdc } = useContext(TodoContext);
  const [msg, setMsg] = useState(" ");
  const [dis, setDis] = useState({ p1: true, p2: true });

  const logout = () => {
    setCust({});
    setPop({ p1: false, p2: false, p3: false });
    setData([]);
    localStorage.setItem("user-det", JSON.stringify({}));
  };

  const login = async () => {
    setDis({ p1: false, p2: true });
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#pass").value;

    if (username.length > 0 && password.length > 2) {
      const res = await fetch(apiUrl + "login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const responce = await res.json();

      if (responce.status === "success") {
        setCust(responce.user);
        setData(responce.user.cards?.data || []);
        setIdc(responce.user.cards?.idc || 0);
        setDis({ p1: true, p2: true });
        localStorage.setItem(
          "user-det",
          JSON.stringify({ username, password })
        );
      } else {
        setMsg(responce.status);
        console.log(responce);
        setDis({ p1: true, p2: true });
      }
    } else {
      setMsg("Enter valid username and pasword");
      setDis({ p1: true, p2: true });
    }
  };

  const signup = async () => {
    setDis({ p1: false, p2: false });
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#pass").value;
    if (username.length > 0 && password.length > 2) {
      const usr = { username, password };

      const res = await fetch(apiUrl + "signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(usr),
      });

      const responce = await res.json();
      if (responce.status === "success") {
        setCust(responce.user);
        setData(responce.user.cards?.data || []);
        setIdc(responce.user.cards?.idc || 0);
        setMsg(responce.status);
        setDis({ p1: true, p2: true });
        localStorage.setItem("user-set", JSON.stringify(usr));
      } else {
        setMsg(responce.status);
        console.log(responce);
        setDis({ p1: true, p2: true });
      }
    } else {
      setMsg("Enter valid username and pasword");
      setDis({ p1: true, p2: true });
    }
  };

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      exit={{ scale: 0 }}
      style={{
        transformOrigin: "top right",
        position: "absolute",
        top: 80,
        right: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        gap: 10,
        backgroundColor: "#101010",
        borderRadius: 5,
      }}
    >
      {cust?._id ? (
        <>
          <p style={{ width: 200, textAlign: "center" }}>
            Welcome {cust?.username || "User"}!{" "}
          </p>
          <button onClick={logout} className="btnad" style={{ width: "80%" }}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Login or Signup</p>
          <input
            placeholder="username"
            type="text"
            name="username"
            id="username"
          />
          <input placeholder="password" type="password" name="pass" id="pass" />
          <p style={{ color: "red" }}>{msg}</p>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: 10,
              width: "100%",
            }}
          >
            {dis.p1 ? (
              <button onClick={login} className="btnad shrt">
                Login
              </button>
            ) : (
              <button disabled className="btnading">
                Wait
              </button>
            )}
            {dis.p2 ? (
              <button onClick={signup} className="btnad shrt">
                Signup
              </button>
            ) : (
              <button disabled className="btnading">
                Wait
              </button>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Log;
