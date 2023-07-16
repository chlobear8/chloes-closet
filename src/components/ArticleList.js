import React from "react";
import Closet from "./Closet";
import PropTypes from "prop-types";

function ArticleList(props) {
  return (
    <React.Fragment>
      <hr />
      {props.articles.map((article) =>
      <Closet 
      whenArticleClicked={props.onArticleSelection}
      articleName= {article.articleName}
      image={article.image}
      category= {article.category}
      occasion= {article.occasion}
      season= {article.season}
      lastWorn= {article.lastWorn}
      id= {article.id}
      key= {article.id} />
      )}
    </React.Fragment>
  );
}

ArticleList.propTypes = {
  articles: PropTypes.array,
  onArticleSelection: PropTypes.func
}

export default ArticleList;