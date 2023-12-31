import React, { useState } from "react";
import PropTypes from "prop-types";

function BaseImageForm(props) {
  const [state, setState] = useState({baseImage: null});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      baseImage: file
    }));
  };

  function handleNewAvatarFormSubmission(avatarData) {
    
    const { baseImage, ...article } = avatarData; 
    const newAvatar = {
      ...article,
      baseImageUrl: "",
    };
    props.onNewAvatarCreation({newAvatar, baseImage});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewAvatarFormSubmission(state);
  };

  return (
    <React.Fragment>
      <form onSubmit = {handleSubmit}>
        <label>
            Image:
            <input
              type="file"
              name="baseImage"
              accept="image/*"
              onChange={handleImageChange} />
        </label>
      <button type = 'submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

BaseImageForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default BaseImageForm;