import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      {props.articles.map((article) => (
        <div key={article.id} onClick={() => props.onArticleSelection(article.id)}>
          <h1>{article.articleName} : {article.lastWorn}</h1>
          {<img src={article.imageUrl} alt={article.articleName} width="150" height="150"/>}
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
}

Closet.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      articleName: PropTypes.string,
      lastWorn: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ),
  onArticleSelection: PropTypes.func,
};

export default Closet;