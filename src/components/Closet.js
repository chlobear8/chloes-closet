import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenArticleClicked(props.id)}>
        <h1>{props.articleName}</h1>
        {props.image && <img src={URL.createObjectURL(props.image)} alt={props.articleName} />}
        <hr/>
      </div>
    </React.Fragment>
  );
}

Closet.propTypes = {
  articleName: PropTypes.string,
  image: PropTypes.instanceOf(File),
  id: PropTypes.string,
  whenArticleClicked: PropTypes.func
}

export default Closet;