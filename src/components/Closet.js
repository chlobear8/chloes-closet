import React from "react";

function Closet(props) {
  return (
    <React.Fragment>
      <h3>{props.category}</h3>
      <h3>{props.type}</h3>
      <hr/>
    </React.Fragment>
  );
}

export default Ticket;