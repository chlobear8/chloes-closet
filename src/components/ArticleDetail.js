import React from "react";
import PropTypes from "prop-types";

function ArticleDetail(props) {
  const { article, onClickingDelete, onClickingEdit } = props;
  
  return (
    <React.Fragment>
      <h1>Article's Detail</h1>
      <h3>{article.articleName}</h3>
      <h3>{article.lastWorn}</h3>
      {article.image && <img src={URL.createObjectURL(article.image)} alt={article.articleName} />}
      <h3>{article.category} - {article.occasion}</h3>
      <h3>{article.season.join(", ")}</h3>
      <button onClick = {() => onClickingEdit(article.id) }>Update Item</button>
      <button onClick={() => onClickingDelete(article.id) }>Delete Item</button>
      <hr/>
    </React.Fragment>
  );
}

ArticleDetail.propTypes = {
  article: PropTypes.object,
  onClickingEdit: PropTypes.func,
  onClickingDelete: PropTypes.func
};

export default ArticleDetail;