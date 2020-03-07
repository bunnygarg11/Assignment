import React, { useState, useEffect, useRef } from "react";

import "./Search.css";

const Search = React.memo(props => {
  const { searchItem ,items} = props;
  const [enteredFilter, setEnteredFilter] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        
        // if(enteredFilter.length===0){
        //   searchItem(items)
        // }else{
          const data=items.filter(e=>e.title.includes(enteredFilter))
          searchItem(data)
        // }
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
     // eslint-disable-next-line
  }, [enteredFilter, searchItem, inputRef]);

  return (
    <section className="search">
        <div className="search-input">
          <label>Search By Name</label>
          <input
            ref={inputRef}
            type="text"
            value={enteredFilter}
            onChange={event => setEnteredFilter(event.target.value)}
          />
        </div>
    </section>
  );
});

export default Search;
