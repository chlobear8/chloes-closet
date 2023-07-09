import React, { useState } from "react";
import PropTypes from "prop-types";

function ReusableForm(props) {

  const [state, setState] = useState({
    season: [],
  });

  // const [season, setSeason] = useState([]);

    const handleChange = (e) => {
      const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setState((prevState) => ({
        ...prevState,
        [e.target.name]: value
      }));
    };

    const handleCheckedBox = (e) => {
      const { value, checked } = e.target;
      setState((prevState) => {
        if (checked) {
          return { ...prevState, season: [...prevState.season, value] };
        } else {
          return { ...prevState, season: prevState.season.filter((item) => item !== value) };
        }
      });
    };

    return (
      <React.Fragment>
        <form onSubmit = {props.formSubmissionHandler}>
          <input
            type='text'
            name='name'
            value={state.articleName}
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
          {/* <label>
            <input
              type="checkbox"
              name="isChecked"
              checked={state.isChecked}
              onChange={handleChange} />
            Checking Season?
          </label> */}
          <div className = "check-box">
            Spring
              <input
                type="checkbox"
                name="season"
                value="spring"
                checked={state.season.includes("spring")}
                onChange={handleCheckedBox} />
            Summer
              <input
                type="checkbox"
                name="season"
                value="summer"
                checked={state.season.includes("summer")}
                onChange={handleCheckedBox} />
            Fall
              <input
                type="checkbox"
                name="season"
                value="fall"
                checked={state.season.includes("fall")}
                onChange={handleCheckedBox} />
            Winter
              <input
                type="checkbox"
                name="season"
                value="winter"
                checked={state.season.includes("winter")}
                onChange={handleCheckedBox} />
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