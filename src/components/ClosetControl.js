import React, { useState } from "react";
import NewClosetForm from "./NewClosetForm";
import ClosetList from "./ClosetList";

function ClosetControl () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainClosetList, setMainClosetList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (selectedArticle != null) {
      setFormVisibleOnPage(false);
      setSelectedArticle(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewArticleToList = (newArticle) => {
    const newMainClosetList = mainClosetList.concat(newArticle);
    setMainClosetList( newMainClosetList);
    setFormVisibleOnPage(false) 
  }

  const handleDeletingArticle = (id) => {
    const newMainClosetList = mainClosetList.filter(article => article.id !== id);
    setMainClosetList(newMainClosetList);
    setSelectedArticle(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingArticleInList = (articleToEdit) => {
    const editedMainClosetList = mainClosetList
      .filter(article => article.id !== selectedArticle.id)
      .concat(articleToEdit);
    setMainClosetList(editedMainClosetList);
    setEditing(false);
    setSelectedArticle(null);
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