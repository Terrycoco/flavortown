import React, { Fragment, useState, useEffect } from 'react';


const ItemsList = () => {
  const [items, setItems] = useState([]);

  //fetch all
  const getItems = async () => {
    try {
      const response = await fetch("http://localhost:5000/items");
      const jsonData = await response.json();
     //put into store
      setItems(jsonData);
    } catch(err){
      console.error(err.message);
    }
  };


  //reset store after every render?
  useEffect(() => {
    getItems();
  }, []);


   return (<Fragment>
      <table className="table table-hover">
       <thead>
         <tr>
            <th scope="col">Items</th>
          </tr>
       </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.item_id}>
              <td >{item.item}</td>
             </tr>
            ))}
       </tbody>
      </table>
    </Fragment>
)};

export default ItemsList;