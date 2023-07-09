import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenArticleClicked(props.id)}>
        <h1>{props.articleName}</h1>
        <h3>{props.category}</h3>
        <h3>{props.occasion}-{props.season}</h3>
        <hr/>
      </div>
    </React.Fragment>
  );
}

Closet.propTypes = {
  articleName: PropTypes.string,
  category: PropTypes.array,
  occasion: PropTypes.array,
  season: PropTypes.array,
  id: PropTypes.string,
  whenArticleClicked: PropTypes.func
}

export default Closet;