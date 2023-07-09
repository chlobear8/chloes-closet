import React from "react";
import Closet from "./Closet";
import PropTypes from "prop-types";

function ClosetList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.articleList.map((article) =>
      <Closet 
      whenArticleClicked={props.onArticleSelection}
      articleName= {article.articleName}
      image={article.image}
      category= {article.category}
      occasion= {article.occasion}
      season= {article.season}
      id= {article.id}
      key= {article.id} />
      )}
    </React.Fragment>
  );
}

ClosetList.propTypes = {
  closetList: PropTypes.array,
  onArticleSelection: PropTypes.func
}

export default ClosetList;