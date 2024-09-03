import fonts from "../assets/fontS.svg";
import card from "../assets/card.svg";
import user from "../assets/user.svg";
import list from "../assets/checklist.svg";
import { useContext, useState } from "react";
import { TodoContext } from "../App";
import { AnimatePresence, motion } from "framer-motion";
import Log from "./Log";

const Nav = () => {
  const { vtype, setFs, setVtype } = useContext(TodoContext);
  const [pop, setPop] = useState({ p1: false, p2: false, p3: false });

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        position: "fixed",
        top: 0,
        left: 0,
        padding: "10px 50px",
        backgroundColor: "#000000",
      }}
    >
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ position: "relative" }}>
          <img
            src={fonts}
            alt="font size"
            onClick={() => {
              setPop({ p1: !pop.p1, p2: false, p3: false });
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 50,
              left: 0,
              translate: "-50% 0",
            }}
          >
            <AnimatePresence>
              {pop.p1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  style={{
                    transformOrigin: "top",
                    backgroundColor: "#101010",
                    height: 40,
                    width: 130,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                >
                  <input
                    type="range"
                    className="slider"
                    min={1}
                    max={4}
                    onChange={(e) => {
                      setFs(e.target.value / 3 + 0.4);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <img
            src={vtype === "list" ? list : card}
            alt="view"
            onClick={() => {
              setPop({ p1: false, p2: !pop.p2, p3: false });
            }}
          />
          <AnimatePresence>
            {pop.p2 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                style={{
                  transformOrigin: "top",
                  position: "absolute",
                  top: 50,
                  left: 0,
                  translate: "-50% 0",
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#101010",
                  borderRadius: 5,
                }}
              >
                <div
                  onClick={() => {
                    setVtype("list");
                    setPop({ p1: false, p2: false, p3: false });
                  }}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    gap: 10,
                    padding: "0 20px",
                  }}
                >
                  <img src={list} alt="view" style={{ scale: 0.8 }} />
                  <p>List</p>
                </div>
                <div
                  onClick={() => {
                    setVtype("card");
                    setPop({ p1: false, p2: false, p3: false });
                  }}
                  style={{
                    display: "flex",
                    cursor: "pointer",
                    gap: 10,
                    padding: "0 20px",
                  }}
                >
                  <img src={card} alt="view" style={{ scale: 0.8 }} />
                  <p>Card</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div>
          <img
            src={user}
            alt="user"
            onClick={() => {
              setPop({ p1: false, p2: false, p3: !pop.p3 });
            }}
          />
          <AnimatePresence>{pop.p3 && <Log setPop={setPop} />}</AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Nav;
