import groupBy from 'lodash.groupby';
import find from 'lodash.find';


const groupDataByFieldname = (data, fieldname, isSorted) => {
  if (!data) return [];
  let grouped = groupBy(data, function(item) {
       return item[fieldname];
   });
  return grouped;
};


const arrayFindObjectByProp = (arr, propname, value) =>{
  return find(arr, propname, value);
}



export {groupDataByFieldname, arrayFindObjectByProp};