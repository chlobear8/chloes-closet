import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewArticleForm(props) {
  function handleNewArticleFormSubmission(articleData) {
    props.onNewArticleCreation(articleData);
  }

  return(
    <React.Fragment>
      <ReusableForm 
      formSubmissionHandler={handleNewArticleFormSubmission}
      buttonText= "Add to Closet" />
    </React.Fragment>
  );
} 

NewArticleForm.propTypes = {
  onNewArticleCreation: PropTypes.func
};

export default NewArticleForm;