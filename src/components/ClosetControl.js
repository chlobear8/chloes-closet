import React, { useEffect, useState } from "react";
import NewArticleForm from "./NewArticleForm";
import EditArticleForm from "./EditArticleForm";
import ArticleDetail from "./ArticleDetail";
import CalendarView from "./CalendarView";
import { db, auth, storage } from './../firebase.js';
import { collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, getDoc } from "firebase/firestore";
import { formatDistanceToNow } from "date-fns";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import BaseImageForm from "./BaseImageForm";
import Closet from "./Closet";
import ImageLayer from "./ImageLayer";

function ClosetControl () {

  const [formVisibleOnPage, setFormVisibleOnPage] = useState(false);
  const [baseImageFormVisible, setBaseImageFormVisible] = useState(false);
  const [mainClosetList, setMainClosetList] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedBaseImageForm, setSelectedBaseImageForm] = useState(null);
  const [createImageLayer, setCreateImageLayer] = useState(false);
  const [editing, setEditing] = useState(false);
  const [calendarView, setCalendarView] = useState(false);
  const [error, setError] = useState(null);
  const [baseImageUrl, setBaseImageUrl] = useState("");
  let buttonText = "";

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

  useEffect(() => {
    const avatarCollectionRef = collection(db, "avatar");
    
    const unSubscribe = onSnapshot(avatarCollectionRef, (querySnapshot) => {
      const avatarData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          avatarData.push({
            baseImage: data.baseImage,
            baseImageUrl: data.baseImageUrl,
            id: doc.id
          });
        });
      },
      (error) => {
        setError(error.message);
      }
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    const fetchBaseImageUrl = async () => {
      try {
        const avatarDocRef = doc(db, "avatar", "KNye3yGqrbO2tVcSqLyd");
        const avatarDocSnap = await getDoc(avatarDocRef);
        if (avatarDocSnap.exists()) {
          const fetchedBaseImageUrl = avatarDocSnap.get("baseImageUrl");
          if (fetchedBaseImageUrl && fetchedBaseImageUrl.trim() !== "") {
          setBaseImageUrl(fetchedBaseImageUrl);
          } else {
          setBaseImageUrl("");
          }
        } else {
        setBaseImageUrl("");
        }
      } catch (error) {
        setBaseImageUrl("baseImageUrl.jpg");
      }
    };
    fetchBaseImageUrl();
  }, [baseImageUrl]);

  const hasBaseImageInCloset = (imageUrl) => {
    return imageUrl !== "";
};

  const handleClick = () => {
    if (selectedArticle != null) {
      setFormVisibleOnPage(false);
      setSelectedArticle(null);
      setEditing(false);
      setCreateImageLayer(false);
    } else if(buttonText === "Add Clothing") {
      setFormVisibleOnPage(true);
      setSelectedArticle(null);
      setEditing(false);
      setCreateImageLayer(false);
      setBaseImageFormVisible(false);
    } else if (hasBaseImageInCloset(baseImageUrl) !== false) {
      setCreateImageLayer(!createImageLayer);
    } 
    else {
      const hasBaseImage = hasBaseImageInCloset(baseImageUrl);
      setBaseImageFormVisible(!hasBaseImage);
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
    const docRef = await addDoc(collection(db, "article"), newArticle);
    newArticle['id'] = docRef.id
    setMainClosetList([...mainClosetList, newArticle])
    setFormVisibleOnPage(false);
  }

  const handleAddingNewBaseImageToList = async (avatarProps) => {
    const {newAvatar, baseImage} = avatarProps;
    const fileName = `avatar/${newAvatar['baseImage']}.jpg`;
    const storageRef = ref(storage, fileName);
    const resp = await uploadBytes(storageRef, baseImage);
    const url = await getDownloadURL(storageRef, fileName).catch((error) => { throw error });

    newAvatar['baseImageUrl'] = url;
    await addDoc(collection(db, "avatar"), newAvatar);
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
    const { image, ...otherFields } = articleToEdit;
    try {
      if (image) {
        const fileName = `articles/${selectedArticle.articleName}.jpg`;
        const storageRef = ref(storage, fileName);
        await uploadBytes(storageRef, image);
        const url = await getDownloadURL(storageRef);
        otherFields.imageUrl = url;
      }
      await updateDoc(doc(db, "articles", selectedArticle.id), otherFields);
      setEditing(false);
      setSelectedArticle(null);
      setMainClosetList((prevMainClosetList) => {
        return prevMainClosetList.map((article) => {
          if (article.id === selectedArticle.id) {
            return { ...article, ...otherFields };
          }
          return article;
        });
      });
    } catch (error) {
      console.log("Error updating article:", error);
    }
  };

  const handleChangingSelectedArticle = (id) => {
    const selection = mainClosetList.filter(article => article.id === id)[0];
    setSelectedArticle(selection);
  }

  const handleCalendarClick = () => {
    setCalendarView(true);
  }

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
    const hasBaseImage = hasBaseImageInCloset(baseImageUrl);

    if (error) {
      currentlyVisibleState = <p>There was an error: {error}</p>
    } else if (editing) {
      currentlyVisibleState =
      <EditArticleForm
        article = {selectedArticle}
        onEditArticle= {handleEditingArticleInList} />
        buttonText = "Return to Closet";
    } else if (selectedArticle != null) {
      currentlyVisibleState = 
      <ArticleDetail  
        article = {selectedArticle}
        onClickingDelete={handleDeletingArticle}
        onClickingEdit={handleEditClick} />
        buttonText = "Return to Closet";
    } else if (formVisibleOnPage) {
      currentlyVisibleState = 
      <NewArticleForm 
        onNewArticleCreation = {handleAddingNewArticleToList} />;
        buttonText = "Return to Closet";
    } else if (baseImageFormVisible) {
      currentlyVisibleState =
      <BaseImageForm
        onNewAvatarCreation = {handleAddingNewBaseImageToList} />;
        buttonText = "Submit";
    } else if (calendarView) {
      currentlyVisibleState = 
      <CalendarView 
        onCalendarView = {handleCalendarView} />;
        buttonText = "Return to Closet";
    } else {
      currentlyVisibleState = 
      <Closet
        articles={mainClosetList} 
        onArticleSelection={handleChangingSelectedArticle}/>;
        buttonText = "Add Clothing";
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        {error ? null : <button onClick = {handleClick}>{buttonText}</button>}
        {!hasBaseImage && !baseImageFormVisible && !selectedArticle && (
          <button onClick = {baseImageClickHandler}> Add Avatar</button>
        )}
        {createImageLayer && 
          (<ImageLayer 
            images = {mainClosetList.map((article) => ({
              src: article.imageUrl,
              position: {
                top: "50px",
                left: "50px"
              },
            }))}
            baseImage = {baseImageUrl} />)}
        <button onClick = {() => setCreateImageLayer(true)}>Create Outfit</button>
      </React.Fragment>
    );
  }
}

export default ClosetControl;