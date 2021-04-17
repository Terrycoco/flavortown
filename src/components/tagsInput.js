import React, {Fragment, useState, useEffect, useCallback} from "react"
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

const TagsInput = ({value, afterChange}) => {
  const [internalVal, setInternalVal] = useState([]);

 useEffect(() => {
  console.log('value has changed:', value);
  //only change internal value if number of elements change
  const changeTagValues = () => {
    if (internalVal.length !== value.length) {
      setInternalVal(oldArr => value);
    }
    else {
      console.log('no change');
    }
  };

  changeTagValues();
 },[value]);



 //workds on both removing and adding
  const onChange = useCallback(e => {
    console.log('onChange called');
    afterChange(e.detail.value);
  }, [afterChange]);


  return (
   <Fragment>
    <Tags
      value={internalVal}
      onChange={onChange}
    />
    </Fragment>
  )
};


export default TagsInput;