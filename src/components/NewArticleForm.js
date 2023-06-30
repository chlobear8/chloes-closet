import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewArticleForm(props) {
  function handleNewArticleFormSubmission(e) {
    e.preventDefault();
    props.onNewArticleCreation({
      articleOfClothing: e.target.articleOfClothing.value,
      category: e.target.category.value,
      occassion: e.target.occassion.value
    });
  }
  return(
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleNewArticleFormSubmission}
      buttonText= "Add to Closet" />
    </React.Fragment>
  );
} 

NewArticleForm.propTypes = {
  onNewArticleCreation: PropTypes.func
};

export default NewArticleForm;