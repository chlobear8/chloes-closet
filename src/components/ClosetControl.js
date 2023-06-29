import React, { useState } from "react";
import NewClosetForm from "./NewClosetForm";
import ClosetList from "./ClosetList";

function ClosetControl () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  const handleClick = () => {
    setFormVisibleOnPage(true);
  }

  const handleAddingNewArticleToList = (newArticle) => {
    const newMainClosetList = state.mainClosetList.concat(newArticle);
    setState({mainClosetList: newMainClosetList,
            formVisibleOnPage: false });
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (formVisibleOnPage) {
    currentlyVisibleState = <NewClosetForm onNewArticleCreation = {handleAddingNewArticleToList} />;
    buttonText = "Return to Closet";
  } else {
    currentlyVisibleState = <ClosetList onClothingSelection = {handleChangingSelection} closetList = {mainClosetList} />;
    buttonText = "Add Clothing";
  }

  return (
    <React.Fragment>
      {currentlyVisibleState}
      <button onClick = {handleClick}>{buttonText}</button>
    </React.Fragment>
  );
}

export default ClosetControl;