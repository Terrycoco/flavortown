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



function childrenToArray(data, counter=0, result=[], parent) {
  return new Promise(function(resolve, reject) {
  if (counter < data.length) {
  //  console.log('loop ', counter, 'parent:', parent);

     let row = data[counter];
   //  console.log('row to evaluate:', row);

    
      if (!row) {
        resolve(result);
        return;
      }

     //normal item just push
     if (!row.is_parent && !row.is_child) {
   //   console.log('not child nor parent')
      if (parent) {
        result.push(parent);
      }
      result.push(row);
      childrenToArray(data, ++counter, result);
     }

     //new parent item
     if (row.is_parent && !row.is_child) {
    //  console.log('parent not child')
       let parent = row;
       parent.children = [];
       childrenToArray(data, ++counter, result, parent)
     }

     if (row.is_child && row.parent_id === parent.parent_id) {
    //  console.log('child only');
      parent.children.push(row)
      childrenToArray(data, ++counter, result, parent);
     }
  } //end data set

  if (parent) {
    result.push(parent);
  }
  resolve(result);
  return;
});
}


// const nestChildren1 =(data) => {
//   return new Promise(function(resolve, reject) {
//     let items = [];
    
//     for (let p = 0; p < data.length; p++) {
//         if(data[p].is_parent){
//             for(let c = 0; c < data.length; c++){
//                 if(data[p].id === data[c].parent_id){
//                     items = [{
//                         ...data[p],
//                         children: data[c]
//                     }]
//                 }
//             }
//         }
//     }
    
// console.log(items);
// resolve(items)
//   });
// };

const nestChildren = (data) => {
 return new Promise(function(resolve, reject) {
    var items = [];
    var item;

    function addChild(parent, child) {
      parent.children.push(child);
    }

    for (var p = 0; p < data.length; p++) {
      item = data[p];

      if (item.is_parent) {
        item.children = []; 

        for (let c=p+1; c < data.length ; c++)  {
          if (data[c].is_child && data[c].parent_id === item.id) {
            addChild(item, data[c]);
            p = c;
          } else {
            break; 
          }
        }

        items.push(item);
      } else {
        items.push(item);
      }
  }

    resolve(items);
  });
};








export {
        groupDataByFieldname, 
        arrayFindObjectByProp,
        objectIsEmpty,
        childrenToArray,
        nestChildren
      };