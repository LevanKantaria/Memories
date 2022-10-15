

import React, { useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import  './style.css'

const ReactTagsInput = (props) => {
  const [selected, setSelected] = useState([]);
  useEffect(()=>{
    props.onChange(selected,selected.length>0)                                                                                     
  },[selected])

  return (
    <div>
     
      
      <TagsInput
     
        value={selected}
        onChange={setSelected}
        name="tags"
        placeHolder="press enter to add tag "
      />
   
    </div>
  );
};

export default ReactTagsInput;


