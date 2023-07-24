// import React from "react";
// import PropTypes from "prop-types";

// function Closet(props) {
//   return (
//     <React.Fragment>
//       <div onClick = {() => props.whenArticleClicked(props.id)}>
//         <h1>{props.articleName} : {props.lastWorn}</h1>
//         {props.image && <img src={URL.createObjectURL(props.image)} alt={props.articleName} />}
//         <hr/>
//       </div>
//     </React.Fragment>
//   );
// }

// Closet.propTypes = {
//   articleName: PropTypes.string,
//   lastWorn: PropTypes.string,
//   image: PropTypes.instanceOf(File),
//   id: PropTypes.string,
//   whenArticleClicked: PropTypes.func
// };

// export default Closet;

import React from "react";
import PropTypes from "prop-types";

function Closet(props) {
  return (
    <React.Fragment>
      {props.articles.map((article) => (
        <div key={article.id} onClick={() => props.whenArticleClicked(article.id)}>
          <h1>{article.articleName} : {article.lastWorn}</h1>
          {article.image && <img src={article.imageUrl} alt={article.articleName} />}
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
}

Closet.propTypes = {
  articles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      articleName: PropTypes.string,
      lastWorn: PropTypes.string,
      imageUrl: PropTypes.string,
    })
  ),
  whenArticleClicked: PropTypes.func,
};

export default Closet;