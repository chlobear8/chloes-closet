import React from "react";
import NewClosetForm from "./NewClosetForm";
import ClosetList from "./ClosetList";

function ClosetControl () {

  const handleClick = () => {
    setFormVisibleOnPage(true);
  }

  let currentlyVisibleState = null;
  let addClothingButton = null;

  if (formVisibleOnPage) {
    currentlyVisibleState = <NewClosetForm onNewClosetCreation = {handleAddingNewArticleToList} />;
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