import React, {Fragment, useState, useEffect} from "react"
import { WithContext as ReactTags } from 'react-tag-input';
import  '../styles/reactTags.css';
// const data = [
//                 { id: "1", text: "India" },
//                 { id: '2', text: 'USA' },
//                 { id: '3', text: 'Germany' },
//                 { id: '4', text: 'Austria' },
//                 { id: '5', text: 'Costa Rica' },
//                 { id: '6', text: 'Sri Lanka' },
//                 { id: '7', text: 'Thailand' }
//              ];
// const selected = [
//                 { id: "7", text: "Thailand" },
//                 { id: "8", text: "India" }
//                 ];

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];


            
const TagsInput = ({data, selected, afterChange}) => {
    const [tags, setTags] = useState([]);
    const [suggestions, setSuggestions] = useState(data);

    useEffect(()=> {
      setTags(selected);
      setSuggestions(data);
      //initial load
    },[data]);


    const handleAddition = (tag) => {
       setTags(oldArray => [...tags, tag]);
    };

    const handleDelete = (i) => {
      let tagscopy = tags.splice(0);
      setTags(tagscopy.filter((tag, index)=> index !== i));
    };


  return (
   <div>
    <ReactTags 
        tags={tags}
        placeholder="Enter flavor from list"
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        delimiters={delimiters}
        labelField="friend" />
    </div>
  )
};


export default TagsInput;