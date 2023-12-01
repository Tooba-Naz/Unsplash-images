export const addToCollection = (image) => (dispatch) => {
   
    dispatch({
      type: 'ADD_TO_COLLECTION',
      payload: image,
    });
  };