import React, { useReducer,  useCallback, useMemo } from 'react';

import ItemForm from './ItemForm';
import ItemList from './ItemList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';

const itemReducer = (curItems, action) => {
  switch (action.type) {
    case 'SET':
      return action.items;
    case 'ADD':
      return [...curItems, action.item];
    case 'DELETE':
      return curItems.filter(ing => ing.id !== action.id);
      case "SORTBYDATE":
      return [...curItems.sort((a,b)=>a.Date-b.Date)]

      case "SORTBYNAME":
        return [...curItems.sort((a,b)=>{
          if(a.title.toUpperCase()>b.title.toUpperCase()){
            return 1
          }
          else{return -1}
        })]
        case "SORTBYQUANTITY":
          return [...curItems.sort((a,b)=>a.quantity-b.quantity)]
    default:
      throw new Error('Should not get there!');
  }
};

const serverReducer = (curServerState, action) => {
  switch (action.type) {
    case 'SEND':
      return { loading: true, error: null };
    case 'RESPONSE':
      return { ...curServerState, loading: false };
    case 'ERROR':
      return { loading: false, error: action.errorMessage };
    case 'CLEAR':
      return { ...curServerState, error: null };
    default:
      throw new Error('Should not be reached!');
  }
};

const Items = () => {
  const [itemsState, dispatch] = useReducer(itemReducer, []);
  const [serverState, dispatchServer] = useReducer(serverReducer, {
    loading: false,
    error: null
  });
 

 

  const searchHandler = useCallback(searchedItems => {
    dispatch({ type: 'SET', items: searchedItems });
  }, []);
  const sortByDateHandler = useCallback(() => {
    dispatch({ type: 'SORTBYDATE'});
  }, []);

  const sortByNameHandler = useCallback(() => {
    dispatch({ type: 'SORTBYNAME'});
  }, []);
  const sortByQTYHandler = useCallback(() => {
    dispatch({ type: 'SORTBYQUANTITY'});
  }, []);

  const addHandler = useCallback(item => {
    dispatchServer({ type: 'SEND' });
   
    setTimeout(()=>{
      dispatchServer({type:"RESPONSE"})
      dispatch({
        type:"ADD",
        item:{id:item.title,Date:new Date(),...item}
      })
    },500)
  }, []);

  const removeHandler = useCallback(itemId => {
    dispatchServer({ type: 'SEND' });
    


      setTimeout(()=>{
        dispatchServer({type:"RESPONSE"})
        dispatch({type:"DELETE",id:itemId})
      },500)
  }, []);

  const clearError = useCallback(() => {
    dispatchServer({ type: 'CLEAR' });
  }, []);
  const setError = useCallback(() => {
    dispatchServer({ type: 'ERROR',errorMessage:"Fields can not be left empty" });
  }, []);

  const itemList = useMemo(() => {
    return (
      <ItemList
        items={itemsState}
        onRemoveItem={removeHandler}
        onSortByDate={sortByDateHandler}
        onSortByQTY={sortByQTYHandler}
        onSortByName={sortByNameHandler}

      />
    );
  }, [itemsState, removeHandler,sortByDateHandler,sortByNameHandler,sortByQTYHandler]);

  return (
    <div className="App">
      {serverState.error && (
        <ErrorModal onClose={clearError}>{serverState.error}</ErrorModal>
      )}

      <ItemForm
        addItem={addHandler}
        loading={serverState.loading}
        setError={setError}
      />

      <section>
        <Search
          searchItem={searchHandler}
          items={itemsState}
        />
        {itemList}
      </section>
    </div>
  );
};

export default Items;
