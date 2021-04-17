import groupBy from 'lodash.groupby';


const groupDataByFieldname = (data, fieldname, isSorted) => {
  if (!data) return [];
  let grouped = groupBy(data, function(item) {
       return item[fieldname];
   });
  return grouped;
};
// const groupDataByFieldname = (data, fieldname, isSorted) => {
// //returns array of objects
// //child named 'items' will have another array of objects
//   if (!data) return [];
//   //if not pre-sorted do it
//   if (!isSorted) {
//     data.sort((a, b) => (a[fieldname] > b[fieldname]) ? 1 : -1);
//   }
  
//   let groupArray = [];
//   let currParent = {};
//   let currGroupVal = "";

//   data.forEach(i => {
//     //set up first one
//     if (i.key === 0) {
//       currGroupVal = i[fieldname];
//       currParent[fieldname] = currGroupVal;
//       currParent.items = [];
//       currParent.items.push(i);
//       return;
//     }
//     if (i[fieldname] === currGroupVal) {
//       //just push field into items
//       currParent.items.push(i);
//       return;
//     }
//     if (i[fieldname] !== currGroupVal) {
//       //push what's already there
//       groupArray.push(currParent);
//       currGroupVal = i[fieldname];
//       currParent = {};
//       currParent[fieldname] = currGroupVal;
//       currParent.items = [];
//       currParent.items.push(i);
//       return;
//     }
//   });

//   return groupArray;
// };

const arrayFindObjectByProp = (arr, propname, value) =>{
  return arr.find(x => x[propname] === value);
}




export {groupDataByFieldname, arrayFindObjectByProp};