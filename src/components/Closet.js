import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenArticleClicked(props.id)}>
        <h1>{props.articleOfClothing}</h1>
        <h3>{props.category}</h3>
        <h3>{props.occasion}</h3>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Closet.propTypes = {
  articleOfClothing: PropTypes.string,
  category: PropTypes.array,
  type: PropTypes.array,
  id: PropTypes.string,
  whenArticleClicked: PropTypes.func
}

export default Closet;