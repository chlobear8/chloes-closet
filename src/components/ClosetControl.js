import React, { useState } from "react";
import NewClosetForm from "./NewClosetForm";
import ClosetList from "./ClosetList";

function ClosetControl () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);

  const handleClick = () => {
    if (selectedArticle != null) {
      setFormVisibleOnPage(false);
      setSelectedArticle(null);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewArticleToList = (newArticle) => {
    const newMainClosetList = this.state.mainClosetList.concat(newArticle);
    this.setState({mainClosetList: newMainClosetList});
    setFormVisibleOnPage(false) 
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