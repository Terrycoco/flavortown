import React, { Fragment, useState, useEffect } from 'react';
import APICalls from '../APICalls';


const ItemsList = () => {
  const [items, setItems] = useState([]);


  //reset store after every render?
  useEffect(() => {
    const getItems = async () => {
      const data = await APICalls.getItems();
      setItems(data);
    }
    getItems();
  }, []);  //on load only


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