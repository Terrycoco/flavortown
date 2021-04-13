import {useEffect} from 'react';

const useKeyPress = (targetKey, action) => {

  //add event listeners
  useEffect(() => {
    function onKeyup(e) {
      if (e.key === targetKey && e.ctrlKey) action();
    }
    window.addEventListener("keyup", onKeyup);

    //remove event listeners on cleanup
    return () => {
      window.removeEventListener("keyup", onKeyup);
    };
  }, []); //empty array ensures that effect is only run on mount and unmount

}

export default useKeyPress;