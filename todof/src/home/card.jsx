import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TodoContext } from "../App";
import el from "../assets/edit.svg";
import Modifycomp from "./Modifycomp";

const Card = ({ obj, handleDragStart }) => {
  const { fs } = useContext(TodoContext);
  const [edit, setEdit] = useState(false);
  const [modify, setModify] = useState(false);

  return (
    <motion.div
      layout
      //layoutId={obj.id}
      onMouseMove={() => {
        if (!modify) {
          setEdit(true);
        }
      }}
      onMouseLeave={() => {
        setEdit(false);
      }}
      draggable={!modify}
      onDragStart={(e) => handleDragStart(e, obj)}
      className="list-el"
      style={{ width: "95%", borderRadius: 10, position: "relative" }}
    >
      <p style={{ fontSize: `${fs + 0.3}rem`, fontWeight: 500 }}>{obj.title}</p>
      <p style={{ fontSize: `${fs}rem` }}>{obj.details}</p>
      {edit && (
        <img
          src={el}
          onClick={() => {
            setModify(!modify);
            setEdit(false);
          }}
          style={{ position: "absolute", top: 5, right: -20 }}
        />
      )}
      <AnimatePresence>
        {modify && <Modifycomp obj={obj} setModify={setModify} />}
      </AnimatePresence>
    </motion.div>
  );
};

export default Card;
