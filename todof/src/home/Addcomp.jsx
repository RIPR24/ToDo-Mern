import { useContext, useState } from "react";
import Add from "../assets/add2.svg";
import { TodoContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";

const Addcomp = () => {
  const [addwin, setAddwin] = useState(false);
  const { fs, apiUrl, cust, data, setData } = useContext(TodoContext);
  const [adding, setAdding] = useState(false);

  const addCard = async () => {
    const tit = document.getElementById("add-title").value;
    const det = document.getElementById("add-det").value;
    const ex = /(https?:\/\/[^\s]+)/;
    let spl = det.split(ex);
    spl = spl.map((el) => ({ txt: el, type: ex.test(el) ? "a" : "s" }));
    let card = { title: tit, details: spl, type: 0, id: Date.now() };
    const copy = [...data, card];
    setData(copy);

    if (cust?._id) {
      setAdding((p) => !p);
      try {
        const res = await fetch(apiUrl + "addcard", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            id: cust._id,
            data: copy,
          }),
        });
        const dat = await res.json();
        setAdding(false);
      } catch (error) {
        alert("error");
        setAdding(false);
      }
    }
    setAddwin(false);
  };

  return (
    <div
      className="addc"
      style={{ position: "fixed", bottom: 100, right: 150 }}
    >
      <img
        src={Add}
        alt=""
        onClick={() => {
          setAddwin(!addwin);
        }}
      />
      <AnimatePresence>
        {addwin && (
          <>
            <div
              onClick={() => {
                setAddwin(false);
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
                bottom: "10vh",
                right: "0",
                display: "flex",
                flexDirection: "column",
                zIndex: 1,
                transformOrigin: "bottom right",
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
                ></textarea>
                <textarea
                  style={{ flexGrow: 1, fontSize: `${fs + 0.1}rem` }}
                  placeholder="Details"
                  name="details"
                  id="add-det"
                ></textarea>
              </div>
              <div className="butns">
                <button
                  className="btnc"
                  onClick={() => {
                    setAddwin(false);
                  }}
                >
                  cancel
                </button>
                {adding ? (
                  <button disabled className="btnading">
                    Adding
                  </button>
                ) : (
                  <button onClick={addCard} className="btnad">
                    Add Card
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Addcomp;
