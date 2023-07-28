import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageLayer from './ImageLayer';
import LastWornTimer from './LastWornTimer';
import { db } from './../firebase.js';
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";

function Avatar(props) {
  const baseImage = props.baseImage;
  const images = props.articles.map(article => article.image);
  const [isActive, setIsActive] = LastWornTimer();
  const timer = LastWornTimer();
  const [newAvatar, setNewAvatar] = useState({ baseImage: '', images: []});
  const [baseImageUrl, setBaseImageUrl] = useState(`{baseImageUrl}`);

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
        setMainClosetList(avatarData);
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
        const avatarDocRef = doc(db, "avatar", baseImageUrl.id);
        const avatarDocSnap = await getDoc(avatarDocRef);

        if (avatarDocSnap.exists()) {
          const fetchedBaseImageUrl = avatarDocSnap.get("baseImageUrl");
          if (fetchedBaseImageUrl && fetchBaseImageUrl.trim() !== "") {
          setBaseImageUrl(fetchedBaseImageUrl);
          } else {
            console.log("Base Image URL is empty or undefined");
          setBaseImageUrl("");
          }
        } else {
          console.log("Avatar document does not exist");
        setBaseImageUrl("");
        }
      } catch (error) {
        console.log("Error fetching {baseImageUrl}:", error);
        setBaseImageUrl("baseImageUrl.jpg");
      }
    };
    fetchBaseImageUrl();
  }, [baseImageUrl]);

  return (
    <React.Fragment>
      {props.articles.map((avatar) => (
        <div key = {avatar.id}>
          <ImageLayer 
            newAvatar = {newAvatar}
            baseImage={avatar.baseImage}
            baseImageUrl={avatar.baseImageUrl} />
          {isActive ? <h1>{timer}</h1> : <h1>{props.lastWorn}</h1>}
          <button onClick={() => {
            setIsActive(!isActive);
            setNewAvatar({ baseImage, images });
          }}>Set as worn?</button>
        </div>
      ))}
    </React.Fragment>
  );
}

Avatar.propTypes = {
  articles: PropTypes.array,
  lastWorn: PropTypes.string,
  newAvatar: PropTypes.object
};

export default Avatar;
