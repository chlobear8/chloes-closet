import React, { useState } from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {
    const handleChange = (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setState((state) => ({
        ...state,
        [e.target.name]: value
      }));
    };

    const [state, setState] = useState({
      season: "",
    })

    return (
      <React.Fragment>
        <form onSubmit = {props.formSubmissionHandler}>
          <input
            type='text'
            name='name'
            placeholder='Clothing Name' />
          <label>
            Category:
            <select
              name="category"
              value={state.category}
              onChange={handleChange} >
                <option value={""} disabled>Pick your category</option>
                {/* {clothingCategories} */}
              </select>
          </label>
          <label>
            Occasion:
            <select
              name="occasion"
              value={state.occasion}
              onChange={handleChange} >
                <option value={""} disabled>Pick your occasion</option>
                {/* {clothingOccasions} */}
              </select>
          </label>
          <label>
            <input
              type="checkbox"
              name="isChecked"
              checked={state.isChecked}
              onChange={handleChange} />
            Checking Season?
          </label>
          <div className = "radio-button">
            Spring
              <input
                type="radio"
                name="season"
                value="spring"
                checked={state.season === "spring"}
                onChange={handleChange} />
            Summer
              <input
                type="radio"
                name="season"
                value="summer"
                checked={state.season === "summer"}
                onChange={handleChange} />
            Fall
              <input
                type="radio"
                name="season"
                value="fall"
                checked={state.season === "fall"}
                onChange={handleChange} />
            Winter
              <input
                type="radio"
                name="season"
                value="winter"
                checked={state.season === "winter"}
                onChange={handleChange} />
          </div>
          <button type = 'submit'>{props.buttonText}</button>
        </form>
      </React.Fragment>
    );
  }


ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;