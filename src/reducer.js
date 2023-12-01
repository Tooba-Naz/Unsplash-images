
const initialState = {
  collection: [],
};

const imageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_COLLECTION':
      return {
        ...state,
        collection: [...state.collection, action.payload],
      };
    default:
      return state;
  }
};

export default imageReducer;
