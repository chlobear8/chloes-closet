import React from "react";
import PropTypes from "prop-types";

function NewClosetForm(props) {
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
              {clothingCategories}
            </select>
        </label>
        <label>
          Occasion:
          <select
            name="occasion"
            value={state.occasion}
            onChange={handleChange} >
              <option value={""} disabled>Pick your occasion</option>
              {clothingOccasions}
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
        <label>
          <input
            type="radio"
            name="season"
            value="spring"
            checked={state.season === "spring"}
            onChange={handleChange} />{" "}
            Spring
        </label>
        <label>
          <input
            type="radio"
            name="season"
            value="summer"
            checked={state.season === "summer"}
            onChange={handleChange} />{" "}
            Summer
        </label>
        <label>
          <input
            type="radio"
            name="season"
            value="fall"
            checked={state.season === "fall"}
            onChange={handleChange} />{" "}
            Fall
        </label>
        <label>
          <input
            type="radio"
            name="season"
            value="winter"
            checked={state.season === "winter"}
            onChange={handleChange} />{" "}
            Winter
        </label>
        <button type = 'sublit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

NewClosetForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default NewClosetForm;