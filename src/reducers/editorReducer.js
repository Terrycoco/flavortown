import * as e from '../actions/editorActions';


const affinities = [
 {affinity_level: 1, name: "friend"},
 {affinity_level: 2, name: "good friend"},
 {affinity_level: 3, name: "BEST FRIEND"},
 {affinity_level: 4, name: "BFF!"},
 {affinity_level: 5, name: "ingredient"},
 {affinity_level: -1, name: "enemy"},
 {affinity_level:  6, name: "child"}
];


const INITIAL = {
  loading: false,
  hasErrors: false,
  error: '',
  items: [],
  cats: [],
  friends: [],
  affinities: affinities,
  selectedMain: {},
  selectedFriend: {}
};


function editorReducer (state=INITIAL, action) {
    switch (action.type) {
      case e.FETCH_FAILURE:
         return {...state, loading: false, hasErrors: true, error: action.payload}
      case e.LOADING:
         return {...state, loading: true}
      case e.GOT_CATS: 
         return {...state, cats: action.payload, loading: false, hasErrors: false, error: ''}
      case e.GOT_FRIENDS: 
         return {...state, friends: action.payload, loading: false, hasErrors: false, error: ''}     
      case e.GOT_ITEMS: 
         return {...state, items: action.payload, loading: false, hasErrors: false, error: ''}
      case e.RESET:
          return {...state, ...INITIAL}
      case e.SELECTED_FRIEND:
          return {...state, selectedFriend: action.payload}
      case e.SELECTED_MAIN:
          return {...state, selectedMain: action.payload}

       default:
         return state
    }

};


export default editorReducer;