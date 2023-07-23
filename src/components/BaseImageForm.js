import React, { useState } from "react";
import PropTypes from "prop-types";

function BaseImageForm(props) {
  const [state, setState] = useState({baseImage: null});

  const handleImageChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      baseImage: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.formSubmissionHandler(state);
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