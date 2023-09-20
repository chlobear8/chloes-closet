import { useState, useEffect } from 'react'
import { useAuth } from "../context/authContext";
import { query, where, onSnapshot, collection, doc , orderBy} from "firebase/firestore";
import { db } from "../firebase";

// =============================================================
// COLLECTION: closets
// =============================================================

// Use this for getting closets with variable queries
export const useGetClosets = (queries) => {
  const [closets, setClosets] = useState();
  const authContext = useAuth();

  const getClosets = async () => {
    try {
      const collectionRef = collection(db, 'closets');

      // Set query to the entire closets collection as a default
      let q = collection(db, 'closets');

      if (queries === 'userId') {q = query(collectionRef, where('userId', '==', authContext.account.id), orderBy('updatedAt', 'desc'))}
      if (queries === 'title=Main Closet') {q = query(collectionRef, where('title', '==', 'Main Closet'))}

      onSnapshot(q, (snapshot) => {
        setClosets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })

    } catch (error) {
      console.log('Error getting closets', error);
    }
  }

  useEffect(() => {
    if (authContext.account) {
      getClosets();
    }
  }, [authContext.account])

  return closets ? closets : null

}

// Use this for getting closets that were created by the current user
export const useGetClosetsUserId = (userId) => {
  const [closets, setClosets] = useState();
  const authContext = useAuth();


  const getClosets = async () => {
    try {
      const collectionRef = collection(db, 'closets');

      // Set query to the entire closets collection as a default
      const q = query(collectionRef, where('userId', '==', userId ? userId : authContext.account.id), orderBy('updatedAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        setClosets(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })

    } catch (error) {
      console.log('Error getting closets', error);
    }
  }

  useEffect(() => {
    getClosets();
  }, [authContext.account])

  return closets ? closets : null

}

// Use this for getting a single closet based on the closet id (closetId)
export const useGetCloset = (closetId) => {
  const [closet, setCloset] = useState();

  const getCloset = async () => {
    try {
      const closetRef = doc(db, 'closets', closetId);

      onSnapshot(closetRef, (doc) => {
        setCloset({...doc.data(), id: doc.id})
      })


    } catch (error) {
      console.log('Error getting single closet', error);
    }
  }

  useEffect(() => {
    getCloset();
  }, [closetId])

  return closet ? closet : null

}

// =============================================================
// COLLECTION: articles
// =============================================================

// Get article based on article id (articleId)
export const useGetArticle = (articleId) => {
  const [article, setArticle] = useState();

  const getArticle = async () => {
    try {
      const docRef = doc(db, 'articles', articleId);

      onSnapshot(docRef, (doc) => {
        setArticle({...doc.data(), id: doc.id});
      })

    } catch (error) {
      console.log('Error getting article', error);
    }
  }

  if (article?.createType === 'link') {

  } 


  useEffect(() => {
    if(articleId) {
      getArticle();
    }
  }, [articleId]);


  // ==================================
  // USE IF ARTICLE.CREATETYPE === 'LINK'
  // ==================================

  useEffect(() => {
    if (article?.createType === 'link') {
      getCategory(article.categoryId);
    }
  }, [article?.categoryId])

  const getCategory = async (categoryId) => {
    try {
      const categoryRef = doc(db, 'categories', categoryId);

      onSnapshot(categoryRef, (doc) => {
        setArticle({ ...article, cards: doc.data().cards })
      })

    } catch (error) {
      console.log('Error getting single category', error);
    }
  }

  return article ? article : null
}

// Get all articles based on the current user
export const useGetArticlesUserId = (userId) => {
  const [articles, setArticles] = useState();
  const authContext = useAuth();

  const getArticles = async () => {
    try {
      const collectionRef = collection(db, 'articles');
      const q = query(collectionRef, where('userId', '==', userId ? userId : authContext.account.id), orderBy('updatedAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        setArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting articles', error);
    }
  }

  useEffect(() => {
    if (authContext.account || userId) {
      getArticles();
    }
  }, [authContext.account, userId])

  return articles ? articles : null

}

// Get all articles based on the current user and selected closet (closetId)
export const useGetArticlesUserClosetId = (closetId) => {
  const [articles, setArticles] = useState();
  const authContext = useAuth();

  const getArticles = async () => {
    try {
      const collectionRef = collection(db, 'articles');
      const q = query(
        collectionRef,
        where('userId', '==', authContext.account.id),
        where('closetIds', 'array-contains', closetId)
      );
      onSnapshot(q, (snapshot) => {
        setArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting articles', error);
    }
  }

  useEffect(() => {
    if (authContext.account && closetId) {
      getArticles();
    }
  }, [authContext.account, closetId])

  return articles ? articles : null

}


// Get all articles based on the current user and selected closet (closetId)
export const useGetArticlesClosetId = (closetId) => {
  const [articles, setArticles] = useState();

  const getArticles = async () => {
    try {
      const collectionRef = collection(db, 'articles');
      const q = query(
        collectionRef,
        where('closetIds', 'array-contains', closetId)
      );
      onSnapshot(q, (snapshot) => {
        setArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting articles', error);
    }
  }

  useEffect(() => {
    if (closetId) {
      getArticles();
    }
  }, [closetId])

  return articles ? articles : null

}


// =============================================================
// COLLECTION: categories
// =============================================================


// Get all categories based on current user
export const useGetCategoryUserId = (userId) => {
  const [categories, setCategories] = useState();
  const authContext = useAuth();
  const getCategory = async () => {
    try {
      const collectionRef = collection(db, 'categories');
      const q = query(collectionRef, where('userId', '==', userId ? userId : authContext.account.id), orderBy('updatedAt', 'desc'));
      onSnapshot(q, (snapshot) => {
        setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting categories', error);
    }
  }

  useEffect(() => {
    if (authContext.account || userId) {
      getCategory();
    }
  }, [authContext.account, userId])

  return categories ? categories : null

}

// Get all categories based on the current user and selected closet (closetId)
export const useGetCategoryUserClosetId = (closetId) => {
  const [categories, setCategories] = useState();
  const authContext = useAuth();

  const getCategories = async () => {
    try {
      const collectionRef = collection(db, 'categories');
      const q = query(
        collectionRef,
        where('userId', '==', authContext.account.id),
        where('closetIds', 'array-contains', closetId)
      );
      onSnapshot(q, (snapshot) => {
        setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting categories', error);
    }
  }

  useEffect(() => {
    if (authContext.account && closetId) {
      getCategories();
    }
  }, [authContext.account, closetId])

  return categories ? categories : null

}


export const useGetCategoryClosetId = (closetId) => {
  const [categories, setCategories] = useState();

  const getCategories = async () => {
    try {
      const collectionRef = collection(db, 'categories');
      const q = query(
        collectionRef,
        where('closetIds', 'array-contains', closetId)
      );
      onSnapshot(q, (snapshot) => {
        setCategories(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting categories', error);
    }
  }

  useEffect(() => {
    if (closetId) {
      getCategories();
    }
  }, [closetId])

  return categories ? categories : null

}



// Use this for getting a single category based on the category id (categoryId)
export const useGetCategory = (categoryId, condition) => { //condition is an object
  const [category, setCategory] = useState();

  const getCategory = async () => {
    try {
      const categoryRef = doc(db, 'categories', categoryId);

      onSnapshot(categoryRef, (doc) => {
        setCategory({...doc.data(), id: doc.id})
      })


    } catch (error) {
      console.log('Error getting single category', error);
    }
  }

  useEffect(() => {
    if (categoryId) {
      getCategory();
    }
  }, [categoryId])

  return category ? category : null

}



// =============================================================
// COLLECTION: users
// =============================================================


// Get a user based on their id
export const useGetUserById = (userId) => {
  const [user, setUser] = useState();

  const getUser = async () => {
    try {
      const userRef = doc(db, 'users', userId);
      onSnapshot(userRef, (doc) => {
        setUser({...doc.data(), id: doc.id})
      })

    } catch (error) {
      console.log('Error getting user', error);
    }
  }

  useEffect(() => {
    if (userId) {
      getUser();
    }
  }, [userId])

  return user ? user : null
}




// =============================================================
// COLLECTION: feedback
// =============================================================


// Get all feedback
export const useGetFeedback = () => {
  const [feedback, setFeedback] = useState();

  const getFeedback = async () => {
    try {
      const collectionRef = collection(db, 'feedback');

      onSnapshot(collectionRef, (snapshot) => {
        setFeedback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting feedback', error);
    }
  }

  useEffect(() => {
      getFeedback();
  }, [])

  return feedback ? feedback : null
}

// Get feedback made by current user
export const useGetUsersFeedback = () => {
  const [feedback, setFeedback] = useState();
  const authContext = useAuth();

  const getUsersFeedback = async () => {
    try {
      const collectionRef = collection(db, 'feedback');
      const q = query(
        collectionRef,
        where('userId', '==', authContext.account.id)
      );

      onSnapshot(q, (snapshot) => {
        setFeedback(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id}) ))
      })
    } catch (error) {
      console.log('Error getting feedback', error);
    }
  }

  useEffect(() => {
    if (authContext.account) {
      getUsersFeedback();
    }
  }, [authContext.account])

  return feedback ? feedback : null
}





