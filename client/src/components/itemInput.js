import React, {useEffect, useState} from 'react';
import axios from 'axios';



const ItemInput = () => {
  const [hintData, setHintData] = useState([]);
  const [text, setText] = useState('');

  const getData = async() => {
    const res = await axios.get('http://localhost:5000/items')
    var hintArray = []
      res.data.map(a => hintArray.push(a.item))
      setHintData(hintArray)
  };

  useEffect(() => {
      getData();
  });

  const checkInput = (e) => {
    console.log("Changed: " & e.target.value);
    setText(e.target.value);
  };

  const enterInput = (e) => {
    //when user inputs for good
    console.log("Entered:" & e.target.value);
    setText(e.target.value);
  }


  return (
    <div>
     <h6>Main Item</h6>
   
      <input className="form-control"
            type="text"
            value={text}
            onInput={e => checkInput(e)}
            onChange={e => enterInput(e)}
      />
 
    </div>
  );
}

export default ItemInput;