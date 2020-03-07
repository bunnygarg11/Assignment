import React from 'react';

import './ItemList.css';

const ItemList = props => {
  // const[sortName,setsortName]=useState(false)
  // const[sortDate,setsortDate]=useState(false)
  // const[sortQty,setsortQty]=useState(false)

  return (
  props.items.length>0 &&  ( <section className="list">
      <h2>Added Items</h2>

      <div style={{display:"flex", justifyContent:"space-between"}}>
       <div style={{margin:"5px"}} className="ingredient-form__actions">
       <button onClick={()=>props.onSortByDate()} type="submit">Sort By Date</button>
       </div>
       <div  style={{margin:"5px"}}className="ingredient-form__actions">
       <button onClick={()=>props.onSortByName()} type="submit">Sort By Name</button>
       </div>
       <div  style={{margin:"5px"}} className="ingredient-form__actions">
       <button onClick={()=>props.onSortByQTY()} type="submit">Sort By Quantity</button>
       </div>
       </div>
      <ul>
        {props.items.map(e => (
          <li key={e.id} onClick={props.onRemoveItem.bind(this, e.id)}>
            <span>{e.title}</span>
            <span>{e.quantity}</span>
            <span>Delete</span>
          </li>
        ))}
      </ul>
    </section>)
  );
};

export default ItemList;
