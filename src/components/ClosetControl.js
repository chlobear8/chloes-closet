import React, { useEffect, useState } from "react";
import NewArticleForm from "./NewArticleForm";
import EditArticleForm from "./EditArticleForm";
import ArticleDetail from "./ArticleDetail";
import CalendarView from "./CalendarView";
import { db, auth, storage } from './../firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import ArticleList from "./ArticleList";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
import BaseImageForm from "./BaseImageForm";
import Closet from "./Closet";

function ClosetControl () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [baseImageFormVisible, setBaseImageFormVisible] = useState(false);
  const [mainClosetList, setMainClosetList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBaseImageForm, setSelectedBaseImageForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [calendarView, setCalendarView] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    function updateAddedToCloset() {
      const newMainClosetList = mainClosetList.map(article => {
        const newWhenAdded = formatDistanceToNow(article.addedToCloset);
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
    const queryByTimeStamp = query(
      collection(db, "articles"),
      orderBy('whenAdded')
    );
    const unSubscribe = onSnapshot(
      queryByTimeStamp,
      (querySnapshot) => {
        const articles = [];
        querySnapshot.forEach((doc) => {
          const addedToCloset = doc.get('addedToCloset', 
          {serverTimestamps: "Added"}).toDate();
          const jsDate = new Date(addedToCloset);
          articles.push({
            articleName: doc.data().articleName,
            image: doc.data().image,
            imageUrl: doc.data().imageUrl,
            baseImage: doc.data().baseImage,
            baseImageUrl: doc.data().baseImageUrl,
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

  const baseImageClickHandler = () => {
    if (selectedBaseImageForm != null) {
      setBaseImageFormVisible(false);
    } else {
    setBaseImageFormVisible(!baseImageFormVisible);
    }
  }

  const handleAddingNewArticleToList = async (articleProps) => {
    const {newArticle, image} = articleProps;
    const fileName = `articles/${newArticle['articleName']}.jpg`;
    const storageRef = ref(storage, fileName);
    const resp = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(storageRef, fileName).catch((error) => { throw error });

    newArticle['imageUrl'] = url;
    await addDoc(collection(db, "article"), newArticle);
    setFormVisibleOnPage(false);
  }

  const handleAddingNewBaseImageToList = async (articleProps) => {
    const {newArticle, baseImage} = articleProps;
    const fileName = `articles/${newArticle['articleName']}.jpg`;
    const storageRef = ref(storage, fileName);
    const resp = await uploadBytes(storageRef, baseImage);
    const url = await getDownloadURL(storageRef, fileName).catch((error) => { throw error });

    newArticle['baseImageUrl'] = url;
    await addDoc(collection(db, "article"), newArticle);
    setBaseImageFormVisible(false);
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

  // const handleCalendarClick = () => {
  //   setCalendarView(true);
  // }

  const handleCalendarView = (calendarPage) => {
    setEditing(false);
    setCalendarView(true);
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
      currentlyVisibleState = 
      <ArticleDetail
        article={selectedArticle}
        onClickingDelete={handleDeletingArticle}
        onClickingEdit={handleEditClick} />
        buttonText= "Return to Closet";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = 
      <NewArticleForm 
        onNewArticleCreation = {handleAddingNewArticleToList} />;
        buttonText = "Return to Closet";
    } else if (baseImageFormVisible) {
      currentlyVisibleState =
      <BaseImageForm
        onNewBaseImageCreation = {handleAddingNewBaseImageToList} />;
        buttonText = "Return to Closet";
    } else if (calendarView) {
      currentlyVisibleState = 
      <CalendarView 
        onCalendarView = {handleCalendarView} />;
        buttonText = "Return to Closet";
    // } else if (selectedArticle == null){
    //   currentlyVisibleState = 
    //   <ArticleList
    //     onArticleSelection={handleChangingSelectedArticle}
    //     articles={mainClosetList} />;
    //     buttonText = "Return to Closet";
    } else {
      currentlyVisibleState = 
      <Closet
        articles={mainClosetList} />;
        buttonText = "Add Clothing";
    }

    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick = {handleClick}>{buttonText}</button>}
        {error ? null : <button onClick = {baseImageClickHandler}>Add Avatar</button>}
      </React.Fragment>
    );
  }
}

export default ClosetControl;