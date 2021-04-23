import React, {Fragment} from 'react';
//import APICalls from '../apiCalls';
//import {groupDataByFieldname} from '../utilities/data'
//import Autocomplete from '../components/autocomplete';
import ItemEdit from '../components/itemEdit';
    
let mock = [{"id":746,"name":"ale","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":200,"name":"amaretto","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":372,"name":"applejack","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":420,"name":"apricot brandy","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":373,"name":"Armagnac","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":572,"name":"banana liqueur","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":535,"name":"beer","cat_id":3,"cat":"Aromatics & Other Flavorings"},{"id":747,"name":"beer, dark","cat_id":3,"cat":"Aromatics & Other Flavorings"}];



function TestPage() {

  return (
      <Fragment>
       <ItemEdit
         items={mock}
         defaultItemId={572}
        />
      </Fragment>
  )
}

export default TestPage;
