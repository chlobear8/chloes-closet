import React, { useState } from "react";
import NewArticleForm from "./NewArticleForm";
import EditArticleForm from "./EditArticleForm";
import ArticleList from "./ArticleList";
import ArticleDetail from "./ArticleDetail";

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

  const handleChangingSelectedArticle = (id) => {
    const selection = mainClosetList.filter(article => article.id === id)[0];
    setSelectedArticle(selection);
  }

  let currentlyVisibleState = null;
  let buttonText = null;

  if (editing) {
    currentlyVisibleState =
    <EditArticleForm  
      article = {selectedArticle}
      onEditArticle= {handleEditingArticleInList} />
      buttonText= "Return to Closet";
  } else if (selectedArticle != null) {
    currentlyVisibleState = <ArticleDetail
      article={selectedArticle}
      onClickingDelete={handleDeletingArticle}
      onClickingEdit={handleEditClick} />
      buttonText= "Return to Closet";
  }else if (formVisibleOnPage) {
    currentlyVisibleState = <NewArticleForm onNewArticleCreation = {handleAddingNewArticleToList} />;
    buttonText = "Return to Closet";
  } else {
    currentlyVisibleState = <ArticleList onArticleSelection = {handleChangingSelectedArticle} articles = {mainClosetList} />;
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