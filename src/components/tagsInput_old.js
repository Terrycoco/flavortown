import React, {Fragment, useState, useEffect, useCallback} from "react"
import Tags from "@yaireo/tagify/dist/react.tagify" // React-wrapper file
import "@yaireo/tagify/dist/tagify.css" // Tagify CSS


const settings = {
    dropdown: {
      enabled: true,
      position: "text",
      closeOnSelecte: true,
      highlightFirst: true
    }
  };

const TagsInput = ({value, data=[], afterChange}) => {
    const [internalVal, setInternalVal] = useState([]);
    const [whitelist, setWhitelist] = useState([]);
    const [loading, setLoading] = useState(true);


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

  const onInput = useCallback(e => {
     var value = e.detail.value;
     console.log('input:', value);
     //reset whitelist
     setWhitelist(oldArr => []);
  });




  return (
   <Fragment>
    <Tags
      setting={settings}
      loading={loading}
      showFilteredDropdown={false}
      whitelist={whitelist}
      value={internalVal}
      onInput={onInput}
      onChange={onChange}
      duplicates={false}
      enforceWhitelist={true}
      autofocus
    />
    </Fragment>
  )
};


export default TagsInput;