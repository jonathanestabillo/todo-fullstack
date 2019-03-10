import {
  LOAD_STATE_ASYNCSTORAGE,
  ADD_ITEM,
  EDIT_ITEM,
  SELECT_EDIT_ITEM,
  CANCEL_EDIT_ITEM,
  DELETE_ITEM,
  REORDER_ITEM,
  ITEM_COMPLETION,
} from '../constants';

const INITIAL_STATE = {
    items: [],
    editingItem: {},
};

const TodosReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DELETE_ITEM:
    case ITEM_COMPLETION:
    case REORDER_ITEM: {
      return { ...state, items: action.payload };
    }
    
    case LOAD_STATE_ASYNCSTORAGE: {
      if(action.payload){
        return { ...state, items: action.payload };
      }else{
        return state;
      }
    }

    case ADD_ITEM: {
      return { ...state, items: [...state.items, action.payload] };
    }

    case CANCEL_EDIT_ITEM: {
      const newState = state.items.length ? { ...state, editingItem: {} } : { ...state };
      return newState;
    }

    case EDIT_ITEM: {
      return { ...state, items: action.payload, editingItem: {} };
    }

    case SELECT_EDIT_ITEM: {
      return { ...state, editingItem: action.payload };
    }

    default: {
      return state;
    }
  }
};

export default TodosReducer;
