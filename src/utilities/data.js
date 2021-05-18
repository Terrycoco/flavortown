import groupBy from 'lodash.groupby';
import find from 'lodash.find';


const groupDataByFieldname = (data, fieldname, isSorted) => {
  if (!data) return [];
  let grouped = groupBy(data, function(item) {
       return item[fieldname];
   });
  return grouped;
};


const arrayFindObjectByProp = (arr, propname, value) =>  {
  return find(arr, propname, value);
}

const objectIsEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};


const nestChildren = (data) => {
  //nests children
  //assumes data already sorted (by server)
  let items = [];


  for (let d = 0; d < data.length; d++) {
    let i = data[d];

    //regular item
    if (!i.is_parent && !i.is_child) {
       items.push(i);

     //parent  
    } else if (i.is_parent) {
       let parent = i;
       let children = [];
       for (d = d+1; data[d].is_child && d < data.length; d++ ) {
         children.push(data[d]);
       } // end inner loop
       parent.children = children;
       items.push(parent);
    }  
       
  } //end outer loop

  return items;
}



export {
        groupDataByFieldname, 
        arrayFindObjectByProp,
        objectIsEmpty,
        nestChildren
      };