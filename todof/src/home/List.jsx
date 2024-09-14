import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { TodoContext } from "../App";
import el from "../assets/edit.svg";
import Modifycomp from "./Modifycomp";

const List = ({ obj, handleDragStart }) => {
  const [win, setWin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [modify, setModify] = useState(false);
  const { fs, setDelact } = useContext(TodoContext);

  return (
    <motion.div
      layout
      draggable={!modify}
      onMouseMove={() => {
        setEdit(true);
      }}
      onMouseLeave={() => {
        setEdit(false);
      }}
      onDragStart={(e) => handleDragStart(e, obj)}
      onDragEnd={() => {
        setDelact(false);
      }}
      className="list-el"
      style={{ width: "95%", borderRadius: 10, position: "relative" }}
    >
      <div
        onClick={() => {
          setWin(!win);
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      ></div>
      <p style={{ fontSize: `${fs + 0.3}rem`, fontWeight: 500, zIndex: -1 }}>
        {obj.title}
      </p>
      {win && <p style={{ fontSize: `${fs}rem`, zIndex: -1 }}>{obj.details}</p>}
      {edit && (
        <img
          src={el}
          onClick={() => {
            setModify(!modify);
            setEdit(false);
          }}
          style={{ position: "absolute", top: 5, right: -20, zIndex: 0 }}
        />
      )}
      {modify && <Modifycomp obj={obj} setModify={setModify} />}
    </motion.div>
  );
};

export default List;
