import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'articles');

function NewArticleForm(props) {
  function handleNewArticleFormSubmission(articleData) {
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      props.onNewArticleCreation(articleData);
    });
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