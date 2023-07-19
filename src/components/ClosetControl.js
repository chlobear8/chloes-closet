import React, { useEffect, useState } from "react";
import NewArticleForm from "./NewArticleForm";
import EditArticleForm from "./EditArticleForm";
import ArticleDetail from "./ArticleDetail";
import CalendarView from "./CalendarView";
import { db, auth } from './../firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";

function ClosetControl () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [mainClosetList, setMainClosetList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [editing, setEditing] = useState(false);
  const [calendarView, setCalendarView] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    function updateAddedToCloset() {
      const newMainClosetList = mainClosetList.map(article => {
        const newWhenAdded = formatDistanceToNow(ticket.addedToCloset);
        return {...article, whenAdded: newWhenAdded};
      });
      setMainClosetList(newMainClosetList);
    }
    const whenAddedTimer = setInterval(() =>
      updateAddedToCloset(), Math.floor((1000 * 60 * 60 * 24))
      );
      return function cleanup() {
        clearInterval(whenAddedTimer);
      }
  }, [mainClosetList])
  
  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "articles"),
      (querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          const addedToCloset = doc.get('addedToCloset', 
          {serverTimestamps: "Added"}).toDate();
          const jsDate = new Date(addedToCloset);
          articles.push({
            articleName: doc.data().articleName,
            image: doc.data().image,
            category: doc.data().category,
            occasion: doc.data().occasion,
            season: doc.data().season,
            lastWorn: doc.data().lastWorn,
            addedToCloset: jsDate,
            whenAdded: formatDistanceToNow(jsDate),
            id: doc.id
          });
        });
        setMainClosetList(articles);
      },
      (error) => {
        setError(error.message);
      }
    );

    return () => unSubscribe();
  }, []);

  const handleClick = () => {
    if (selectedArticle != null) {
      setFormVisibleOnPage(false);
      setSelectedArticle(null);
      setEditing(false);
    } else {
      setFormVisibleOnPage(!formVisibleOnPage);
    }
  }

  const handleAddingNewArticleToList = async (newArticle) => {
    await addDoc(collection(db, "article"), newArticle);
    setFormVisibleOnPage(false);
  }

  const handleDeletingArticle = async (id) => {
    await deleteDoc(doc(db, "article", id));
    setSelectedArticle(null);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleEditingArticleInList = async (articleToEdit) => {
    await updateDoc(doc(db, "article", selectedArticle.id), articleToEdit);
    setEditing(false);
    setSelectedArticle(null);
  }

  const handleChangingSelectedArticle = (id) => {
    const selection = mainClosetList.filter(article => article.id === id)[0];
    setSelectedArticle(selection);
  }

  const handleCalendarClick = () => {
    setCalendarView(true);
  }

  const handleCalendarView = (calendarPage) => {
    setEditing(false);
    setCalendarView(false);
    setSelectedArticle(null);
  }

  if (auth.currentUser == null) {
    return (
      <React.Fragment>
        <h1>You must be signed in to access your closet.</h1>
      </React.Fragment>
    )
  } else if (auth.currentUser != null) {

    let currentlyVisibleState = null;
    let buttonText = null;

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {
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
    } else if (formVisibleOnPage) {
      currentlyVisibleState = <NewArticleForm onNewArticleCreation = {handleAddingNewArticleToList} />;
      buttonText = "Return to Closet";
    } else if (calendarView) {
      currentlyVisibleState = <CalendarView onCalendarView = {handleCalendarView} />;
      buttonText = "Return to Closet";
    } else {
      currentlyVisibleState = <CalendarView
      onCalendarClick={handleCalendarClick} />;
      buttonText = "Add Clothing";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick = {handleClick}>{buttonText}</button>}
      </React.Fragment>
    );
  }
}

export default ClosetControl;