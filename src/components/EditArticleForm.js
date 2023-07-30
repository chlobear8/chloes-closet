import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditArticleForm(props) {
  const { article, onEditArticle } = props;

  function handleEditingArticleInList(articleData) {
      onEditArticle(articleData);
    }
  
    return(
      <React.Fragment>
        <ReusableForm 
        formSubmissionHandler={handleEditingArticleInList}
        buttonText= "Save Edit to Closet" 
        articleData = {article} />
      </React.Fragment>
    );
  } 

EditArticleForm.propTypes = {
  article: PropTypes.object,
  onEditArticle: PropTypes.func
};

export default EditArticleForm;