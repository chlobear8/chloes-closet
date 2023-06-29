import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      <h3>{props.category}</h3>
      <h3>{props.type}</h3>
      <hr/>
    </React.Fragment>
  );
}

Closet.propTypes = {
  category: PropTypes.array,
  type: PropTypes.array
}

export default Closet;