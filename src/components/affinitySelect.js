import React, {Fragment, useState, useEffect} from 'react';
import Select from 'react-select';


const AffinitySelect = ({value, onChange, label, thisRef}) => {
  const [options, setOptions] = useState([]);




  useEffect(() => {
      const optionsList = [

       {value: 1, label: "friend"},
       {value: 2, label: "good friend"},
       {value: 3, label: "BEST FRIEND"},
       {value: 4, label: "BFF!"},
       {value: 5, label: "ingredient"},
       {value: -1, label: "enemy"},
      ];
    setOptions(optionsList);
  }, []);

  // useEffect(() => {
  //   const op = options.find(o => o.value === value);
  //   thisRef.current.value = op;
  // }, [value, options, thisRef]); //update if value is resent in



  function handleChange(op) {
     onChange(op.value);
  }


  return (
    <Fragment>
    <div className="select-control-group">
     <label htmlFor="AffinitySelect" className="control-label">{label}</label>
     <Select
         thisRef={thisRef}
         value={options.find(op => {
           return op.value === value
        })}
         options={options}
         onChange={op => handleChange(op)}
         id="AffinitySelect"
         className="react-select-container"
         classNamePrefix="react-select"
      />
      </div>
    </Fragment>
  );

   
}

export default AffinitySelect;