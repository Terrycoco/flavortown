import React, {Fragment, useState, useEffect, useCallback, useRef} from "react"

//import Tags from "./tagify/react.tagify"
import Tags from "@yaireo/tagify/dist/react.tagify"

/////////////////////////////////////////////////
const mockData = [
 {item_id: 1, item: "garlic"},
{ item_id: 2, item: "tomatoes"},
{item_id: 3, item: "chicken"}
];


// Tagify settings object
const baseTagifySettings = {
  blacklist: ["xxx", "yyy", "zzz"],
  maxTags: 6,
  //backspace: "edit",
  placeholder: "type something",
  dropdown: {
    enabled: 0 // a;ways show suggestions dropdown
  }
}

// this is an example React component which implemenets Tagify within
// itself. This example is a bit elaborate, to demonstrate what's possible.
const TagsInput = () => {
  const tagifyRef = useRef();
  // just a name I made up for allowing dynamic changes for tagify settings on this component
  const [tagifySettings] = useState([]);
  const [tagifyProps, setTagifyProps] = useState({});

  // on component mount
  useEffect(() => {
      setTagifyProps({loading: true});


      setTagifyProps((lastProps) => ({
        ...lastProps,
        showFilteredDropdown: "a",
        loading: false
      }));

}, []); 

      // merged tagify settings (static & dynamic)
      const settings = {
        ...baseTagifySettings,
        ...tagifySettings
      };

      const onChange = useCallback(e => {
        console.log("CHANGED:", e.detail.value)
      },[]);

  // access Tagify internal methods example:
  const clearAll = () => {
    tagifyRef.current && tagifyRef.current.removeAllTags()
  };


  return (
    <Fragment>
      <h2>
        <em>Crazy</em> Tags:
      </h2>
      <p>
        Wait a <em>few seconds</em> to see things happen. <br />
        <small>
          <em>(Carefully examine the source-code)</em>
        </small>
      </p>
      <button className="clearAllBtn" onClick={clearAll}>
        Clear All
      </button>
      <Tags
        tagifyRef={tagifyRef}
        settings={settings}
        defaultValue={mockData}
        autoFocus={true}
        {...tagifyProps}
        onChange={onChange}
        onEditInput={() => console.log("onEditInput")}
        onEditBeforeUpdate={() => console.log`onEditBeforeUpdate`}
        onEditUpdated={() => console.log("onEditUpdated")}
        onEditStart={() => console.log("onEditStart")}
        onEditKeydown={() => console.log("onEditKeydown")}
        onDropdownShow={() => console.log("onDropdownShow")}
        onDropdownHide={() => console.log("onDropdownHide")}
        onDropdownSelect={() => console.log("onDropdownSelect")}
        onDropdownScroll={() => console.log("onDropdownScroll")}
        onDropdownNoMatch={() => console.log("onDropdownNoMatch")}
        onDropdownUpdated={() => console.log("onDropdownUpdated")}
      />
      <h2>Readonly tags:</h2>
      <Tags defaultValue="foo,bar" readOnly />
    </Fragment>
  )
}

export default TagsInput
