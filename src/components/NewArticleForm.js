import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";

function NewArticleForm(props) {

  function handleNewArticleFormSubmission(articleData) {
    
    const { image, ...article } = articleData; 
    const newArticle = {
      ...article,
      imageUrl: "",
    };
    props.onNewArticleCreation({newArticle, image});
  }

  return(
    <React.Fragment>
      <ReusableForm 
      formSubmissionHandler={handleNewArticleFormSubmission}
      buttonText= "Add to Closet"
      file= {props.file} />
    </React.Fragment>
  );
} 

NewArticleForm.propTypes = {
  onNewArticleCreation: PropTypes.func,
  file: PropTypes.object
};

export default NewArticleForm;