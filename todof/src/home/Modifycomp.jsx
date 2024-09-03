import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { TodoContext } from "../App";

const Modifycomp = ({ obj, setModify }) => {
  const [details, setDetails] = useState(obj);
  const { fs, data, setData, idc, cust, apiUrl } = useContext(TodoContext);
  const [adding, setAdding] = useState(false);

  const handleChange = (e) => {
    let val = e.target.value;
    let name = e.target.name;

    let copy = { ...details };
    copy[name] = val;

    setDetails(copy);
  };

  const saveCard = async () => {
    setAdding(true);
    let copy = [...data];
    const nidx = copy.findIndex((c) => c.id === +obj.id);
    copy[nidx] = details;

    setData(copy);

    if (cust?._id) {
      try {
        const res = await fetch(apiUrl + "addcard", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: cust._id,
            idc: idc,
            data: copy,
          }),
        });
        const dat = await res.json();
      } catch (error) {
        console.log(error);
        alert("error");
      }
    }
    setAdding(false);
    setModify(false);
  };

  return (
    <div>
      <div
        onClick={() => {
          setModify(false);
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      ></div>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        style={{
          width: "90vw",
          maxWidth: 400,
          height: "60vh",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50% -50%)",
          display: "flex",
          flexDirection: "column",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "90%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#151515",
            border: "1px solid #303030",
            padding: 20,
            borderRadius: 20,
          }}
        >
          <textarea
            style={{ height: "20%", fontSize: `${fs + 0.2}rem` }}
            name="title"
            id="add-title"
            placeholder="title"
            value={details.title}
            onChange={handleChange}
          ></textarea>
          <textarea
            style={{ flexGrow: 1, fontSize: `${fs + 0.1}rem` }}
            placeholder="Details"
            name="details"
            id="add-det"
            value={details.details}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="butns">
          <button
            className="btnc"
            onClick={() => {
              setModify(false);
            }}
          >
            cancel
          </button>
          {adding ? (
            <button disabled className="btnading">
              Saving
            </button>
          ) : (
            <button onClick={saveCard} className="btnad">
              Save
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Modifycomp;
