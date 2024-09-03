import { useContext, useState } from "react";
import DropIndicator from "./DropIndicator";
import List from "./List";
import DeleteComp from "./DeleteComp";
import { TodoContext } from "../App";
import Card from "./card";
import { AnimatePresence } from "framer-motion";
import Addcomp from "./Addcomp";

export const Col = ({ arr, head, type, movEl }) => {
  const [act, setAct] = useState(false);
  const { vtype, setDelact } = useContext(TodoContext);

  const handleDragStart = (e, obj) => {
    e.dataTransfer.setData("cid", obj.id);
    setDelact(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    highlightIndicators(e);
    setAct(true);
  };

  const highlightIndicators = (e) => {
    const indicators = getIndicators();
    clrInd(indicators);
    const el = nearestInd(e, indicators);
    el.classList.add("drpact");
  };

  const nearestInd = (e, indicators) => {
    const el = indicators.reduce(
      (closest, d) => {
        const box = d.getBoundingClientRect();
        const offset = e.clientY - (box.top + 50);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: d };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el.element;
  };

  const clrInd = (arr) => {
    const ind = arr || getIndicators();
    ind.forEach((el) => el.classList.remove("drpact"));
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-col="${type}"]`));
  };

  const handleDragLeave = () => {
    setAct(false);
    clrInd();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setAct(false);
    const indicators = getIndicators();
    clrInd(indicators);
    const el = nearestInd(e, indicators);
    const cid = e.dataTransfer.getData("cid");
    setDelact(false);

    const bef = el.dataset.pid;
    if (+bef !== +cid) {
      movEl(cid, type, bef);
    }
  };

  return (
    <div className="col">
      <h2 style={{ textAlign: "center" }}>
        {head || ""}{" "}
        <span
          style={{
            fontWeight: 300,
            fontSize: "1rem",
            padding: 10,
          }}
        >
          {arr.length}
        </span>
      </h2>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={act ? "act" : ""}
        style={{ height: "100%" }}
      >
        {arr.map((el, i) => (
          <div key={i}>
            <DropIndicator preId={el.id} col={type} />
            {vtype === "list" ? (
              <List obj={el} handleDragStart={handleDragStart} />
            ) : (
              <Card obj={el} handleDragStart={handleDragStart} />
            )}
          </div>
        ))}
        <DropIndicator preId={-1} col={type} />
      </div>
    </div>
  );
};

const index = () => {
  const { data, setData, delact, idc, cust, apiUrl } = useContext(TodoContext);

  const delEl = async (e) => {
    e.preventDefault();
    const cid = e.dataTransfer.getData("cid");

    let copy = data.filter((el) => el.id !== +cid);

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
        alert("error");
        console.log(error);
      }
    }
  };

  const movEl = async (cid, col, nid) => {
    let copy = [...data];

    const card = copy.find((c) => c.id === +cid);
    copy = copy.filter((el) => el.id !== +cid);
    const nidx = copy.findIndex((c) => c.id === +nid);

    if (+nidx === -1) {
      copy.push({ ...card, type: +col });
    } else {
      copy.splice(nidx, 0, { ...card, type: +col });
    }
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
  };

  return (
    <div className="home">
      <Col
        arr={data.filter((el) => el.type === 0)}
        head={"Bugs List"}
        type={0}
        movEl={movEl}
      />
      <Col
        arr={data.filter((el) => el.type === 1)}
        head={"Ongoing"}
        type={1}
        movEl={movEl}
      />
      <Col
        arr={data.filter((el) => el.type === 2)}
        head={"Fixed"}
        type={2}
        movEl={movEl}
      />
      <AnimatePresence>
        {delact && <DeleteComp delEl={delEl} />}
      </AnimatePresence>
      <Addcomp />
    </div>
  );
};

export default index;
