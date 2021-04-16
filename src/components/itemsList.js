import React, { Fragment, useState, useEffect } from 'react';
import APICalls from '../apiCalls';


const ItemsList = () => {
  const [items, setItems] = useState([]);



  useEffect(() => {
    const getItems = async () => {
      const data = await APICalls.getAllItems();
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
          {items && items.map(item => (
            <tr key={item.item_id}>
              <td >{item.item}</td>
             </tr>
            ))}
       </tbody>
      </table>
    </Fragment>
)};

export default ItemsList;