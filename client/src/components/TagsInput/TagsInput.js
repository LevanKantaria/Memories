import React, { useState } from "react";
// import { render } from 'react-dom';
// import { COUNTRIES } from './countries';
import "./style.css";
import { WithContext as ReactTags } from "react-tag-input";

// const suggestions = COUNTRIES.map(country => {
//   return {
//     id: country,
//     text: country
//   };
// });

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

const TagsInput = (props) => {
  const [tags, setTags] = React.useState([]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
    // console.log(tags)
    
      let planeTags = tags.map((tag) => {
        return `#${tag.id}`;
      });
      console.log(planeTags);
      props.onChange([...planeTags, '#' + tag.id], [...planeTags,  tag.id].length > 0);
  
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  return (
    <div className="app">
      <div>
        <ReactTags
          tags={tags}
          //   suggestions={suggestions}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
        />
      </div>
    </div>
  );
};

export default TagsInput;
