import React, {Fragment, useState,useRef} from 'react';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import '../styles/autocomplete.css';

const data = [
  { id: 1, name: "devrecipes.net" },
  { id: 2, name: "devrecipes" },
  { id: 3, name: "devrecipe" },
  { id: 4, name: "dev recipes" },
  { id: 5, name: "development" }
];

const mockResults = (keyword) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const searchResults = data.filter((item) => item.name.includes(keyword));
      res(searchResults);
    }, 500);
  });
};



const Autocomplete = () => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [isNameSelected, setIsNameSelected] = useState(false);
  const acRef = useRef();

const handleInputChange = (e) => {
  const nameValue = e.target.value;
  setName(nameValue);
  setIsNameSelected(false);
  setResults([]); //clean
  if (nameValue.length > 1) {
    setIsLoading(true);
    mockResults(nameValue) //wait for it
      .then(res => {
        setResults(res);
        setIsLoading(false);
      })
      .catch(()=> {
        setIsLoading(false);
      });
  }
};

const onNameSelected = (name) => {
  setName(name);
  setResults([]);
};


   return (
     <Fragment>
       <div className="ac">
       <Form.Group className="tyacpeahead-form-group">
        <Form.Control 
          type="text" 
          autoComplete="off"
          onChange={handleInputChange}
          value={name}
       />
        <ListGroup className="ac-list-group">
        {!isNameSelected && results.length > 0 &&
          results.map(result => (

          <ListGroup.Item
             key={result.id}
             className="ac-list-group-list-group-item"
             onClick={() => onNameSelected(result.name)}
          >
           {result.name}
          </ListGroup.Item>
      ))}
          {!results.length && isLoading && (
            <div className="ac-spinner-container">
               <Spinner animation="border"  />
            </div>
            )}
        </ListGroup>
      </Form.Group>
      </div>
     </Fragment>

  );

};



export default Autocomplete;