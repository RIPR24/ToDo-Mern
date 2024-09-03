const DropIndicator = ({ preId, col }) => {
  return (
    <div
      data-col={col}
      data-pid={preId || -1}
      style={{
        height: 5,
        borderRadius: 2,
        width: "90%",
        transition: ".05s",
        margin: "5px auto",
      }}
    ></div>
  );
};

export default DropIndicator;
