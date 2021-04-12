import React, {Fragment, useState, useEffect} from 'react';
import Select from 'react-select';


const AffinitySelect = ({value, onChange, label}) => {
  const [options, setOptions] = useState([]);




  useEffect(() => {
      const optionsList = [
       {value: -1, label: "enemy"},
       {value: 1, label: "friend"},
       {value: 2, label: "good friend"},
       {value: 3, label: "best friend"},
       {value: 4, label: "BFF"},
      ];
    setOptions(optionsList);
  }, []);


  function handleChange(op) {
     onChange(op.value);
  }


  return (
    <Fragment>
    <div className="select-control-group">
     <label htmlFor="AffinitySelect" className="control-label">{label}</label>
     <Select
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