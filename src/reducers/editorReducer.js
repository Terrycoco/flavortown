import * as e from '../actions/editorActions';


const affinities = [
 {friend_type: 1, name: "friend"},
 {friend_type: 2, name: "good friend"},
 {friend_type: 3, name: "BEST FRIEND"},
 {friend_type: 4, name: "BFF!"},
 {friend_type: 5, name: "ingredient"},
 {friend_type: -1, name: "enemy"},
 {friend_type: 0, name: "child"},
 {friend_type: 6, name: "child friend"}
];


const INITIAL = {
  timestamp: Date.now(),
  loading: false,
  hasErrors: false,
  error: '',
  items: [],
  cats: [],
  friends: [],
  affinities: affinities,
  selectedMain: {},
  selectedFriend: {},
  excludeCats: [11,12]
};



function editorReducer (state=INITIAL, action) {
    switch (action.type) {
      case e.CHANGE_EXCLUDED_CATS:
         return {...state, excludeCats: action.payload}     
      case e.FETCH_FAILURE:
         return {...state, loading: false, hasErrors: true, error: action.payload}
      case e.LOADING:
         return {...state, loading: true}
      case e.GOT_CATS: 
         return {...state, cats: action.payload, loading: false, hasErrors: false, error: ''}
      case e.GOT_FRIENDS: 
         return {...state, friends: action.payload, loading: false, hasErrors: false, error: ''}     
      case e.GOT_ITEMS: 
         return {...state, timestamp: Date.now(), items: action.payload, loading: false, hasErrors: false, error: ''}
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