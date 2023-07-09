import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenArticleClicked(props.id)}>
        <h1>{props.articleName}</h1>
        {props.image && <img src={URL.createObjectURL(props.image)} alt={props.articleName} />}
        {/* <h3>Category:{props.category}</h3>
        <h3>Occasion:{props.occasion}</h3>
        <h3>Seasons:{props.season.join(", ")}</h3> */}
        <hr/>
      </div>
    </React.Fragment>
  );
}

Closet.propTypes = {
  articleName: PropTypes.string,
  image: PropTypes.instanceOf(File),
  // category: PropTypes.string,
  // occasion: PropTypes.string,
  // season: PropTypes.array,
  id: PropTypes.string,
  whenArticleClicked: PropTypes.func
}

export default Closet;