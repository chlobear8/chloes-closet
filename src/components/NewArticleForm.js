import React from "react";
import PropTypes from "prop-types";
import ReusableForm from "./ReusableForm";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage();
const storageRef = ref(storage, 'articles');

function NewArticleForm(props) {
  function handleNewArticleFormSubmission(articleData) {
    const { image, ...article } = articleData; 
    uploadBytes(storageRef, image)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
      const newArticle = {
        ...article,
        imageUrl: snapshot.ref.getDownloadURL(),
      };
      props.onNewArticleCreation(newArticle);
    })
    .catch((error) => {
      console.error("Error uploading image:", error);
    });
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