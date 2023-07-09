import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewArticleForm(props) {
  function handleNewArticleFormSubmission(e) {
    e.preventDefault();
    props.onNewArticleCreation({
      articleName: e.target.articleName.value,
      category: e.target.category.value,
      occasion: e.target.occassion.value,
      season: e.target.season.value
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