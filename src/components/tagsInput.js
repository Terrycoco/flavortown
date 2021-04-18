import React, {Fragment, useState, useEffect, useCallback} from "react"
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS

const TagsInput = ({value, data, afterChange}) => {
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
     },[value, internalVal.length]);

    
     useEffect(() => {
      console.log('data has changed:', data);
      //only change internal value if number of elements change
 
     },[data]);

 //workds on both removing and adding
  const onChange = useCallback(e => {
    afterChange(e.detail.value);
  }, [afterChange]);


  return (
   <Fragment>
    <Tags
      whitelist={data}
      value={internalVal}
      onChange={onChange}
      duplicates={false}
      enforceWhitelist={true}
    />
    </Fragment>
  )
};


export default TagsInput;