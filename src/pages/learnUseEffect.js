import React, {useState, useRef, useEffect} from 'react';

function EffectDemo() {
  const [title, setTitle] = useState("default Title");
  const titleRef = useRef();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    console.log('useEffect');
    document.title = title;
  }, [title]); //only run when title changes

  //uncontrolled (use DOM)
  const handleClick = () => setTitle(titleRef.current.value); //performs a state change -> causes rerender
 

  const handleCheckboxChange = () => setDarkMode(prev => !prev); //performs a state change -> causes a rerender;
 
  console.log('rendered');
  return (
   <div className={darkMode ? "dark-mode" : ""}>
      <label htmlFor="darkMode"> dark mode</label>
      <input
        name="darkMode"
        type="checkbox"
        checked={darkMode}
        onChange={handleCheckboxChange}
        />

      <input ref={titleRef} />
      <button onClick={handleClick}> change title </button>
   </div>

  );

}

export default EffectDemo;