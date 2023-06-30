import React from "react";
import ReusableForm from "./ReusableForm";
import PropTypes from "prop-types";

function EditArticleForm(props) {
  // const { article } = props;

  function handleEditFormSubmission(e) {
    e.preventDefault();
    props.onEditArticle({
      articleOfClothing: e.target.articleOfClothing.value,
      category: e.target.category.value,
      occassion: e.target.occassion.value
    });
  }

  return (
    <React.Fragment>
      <ReusableForm formSubmissionHandler={handleEditFormSubmission}
      buttonText= "Update Article" />
    </React.Fragment>
  );
}

EditArticleForm.propTypes = {
  article: PropTypes.object,
  onEditArticle: PropTypes.func
}

export default EditArticleForm;