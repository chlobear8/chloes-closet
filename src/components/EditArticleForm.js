import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditArticleForm(props) {
  function handleEditingArticleInList(articleData) {
      props.onEditArticle(articleData);
    }
  
    return(
      <React.Fragment>
        <ReusableForm 
        formSubmissionHandler={handleEditingArticleInList}
        buttonText= "Save Edit to Closet" />
      </React.Fragment>
    );
  } 

EditArticleForm.propTypes = {
  article: PropTypes.object,
  onEditArticle: PropTypes.func
};

export default EditArticleForm;