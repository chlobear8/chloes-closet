import React, { useState } from "react";
import PropTypes from "prop-types";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function ReusableForm(props) {

  const storage = getStorage();

  const [state, setState] = useState({
    articleName: "",
    image: null,
    category: "",
    occasion: "",
    season: []
  });

  const [imageUrl, setImageUrl] = useState("");

  const clothingCategories = ["Tops", "Bottoms", "Shoes", "Dresses", "Bags", "Accessories", "Outerwear"];

  const clothingOccasions = ["Casual", "Formal", "Work"];

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      image: file
    }));

    if (state.articleName) {
      const articlesImagesRef = ref(storage, 'articles/${state.articleName}.jpg');
      uploadBytes(articlesImagesRef, file)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
              setImageUrl(downloadURL);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    props.formSubmissionHandler(state);
  };

  return (
    <React.Fragment>
      <form onSubmit = {handleSubmit}>
        <input
          type='text'
          name='articleName'
          defaultValue={state.articleName}
          placeholder='Clothing Name'
          onChange={handleChange} />
        <label>
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleImageChange} />
        </label>
        <label>
          Category:
          <select
            name="category"
            value={state.category}
            onChange={handleChange} >
              <option value={""} disabled>Pick your category</option>
              {clothingCategories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
        </label>
        <label>
          Occasion:
          <select
            name="occasion"
            value={state.occasion}
            onChange={handleChange} >
              <option value={""} disabled>Pick your occasion</option>
              {clothingOccasions.map((occasion, index) => (
                <option key={index} value={occasion}>
                  {occasion}
                </option>
              ))}
            </select>
        </label>
        <div className = "check-box">
          Spring
            <input
              type="checkbox"
              name="season"
              value="Spring"
              checked={state.season.includes("Spring")}
              onChange={handleCheckedBox} />
          Summer
            <input
              type="checkbox"
              name="season"
              value="Summer"
              checked={state.season.includes("Summer")}
              onChange={handleCheckedBox} />
          Fall
            <input
              type="checkbox"
              name="season"
              value="Fall"
              checked={state.season.includes("Fall")}
              onChange={handleCheckedBox} />
          Winter
            <input
              type="checkbox"
              name="season"
              value="Winter"
              checked={state.season.includes("Winter")}
              onChange={handleCheckedBox} />
        </div>
        <button type = 'submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}


ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string,
  file: PropTypes.object
};

export default ReusableForm;