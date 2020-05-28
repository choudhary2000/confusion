import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: comment
});


/////////////////Post Comments To server////////////////
export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    raing: rating,
    author: author,
    comment: comment
  }
  newComment.date = new Date().toISOString();

  return fetch(baseUrl + 'comments',{
    method: 'POST',
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  }).then(response => {
            if(response.ok){
              return response;
            }
            else{
              var error = new Error('Error '+ response.status+': '+response.statusText);
              error.response = response;
              throw error;
            }
          } , error => {
            var errmess = new Error(error.message);
            throw errmess;
          }).then(response => response.json())
            .then(response => dispatch(addComment(response)))
            .catch(error => {console.log("Post comments ", error.message);
                              alert('Your comment could not be posted\nError: '+error.message);})
}

////////////Fetch Dishes///////////////////
export const fetchDishes = () => (dispatch) => {
  dispatch(dishLoading(true));
  return fetch(baseUrl + 'dishes')
  .then(response => {
    if(response.ok){
      return response;
    }
    else {
      var error = new Error("Error "+response.status+": "+response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {
    var errmess = new Error(error.message);
    throw errmess;
  } )
  .then((response) => response.json())
  .then((dishes) => dispatch(addDishes(dishes)))
  .catch(error =>  dispatch(dishesFailed(error.message)));
};  // This function is thunk that return function.

export const dishLoading = () => ({type: ActionTypes.DISHES_LOADING});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});

export const dishesFailed = (errmess) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

//////////////fetch Comments///////////////////
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments')
  .then(response => {
    if(response.ok){
      return response;
    }
    else{
      var error = new Error('Error '+response.status+': '+response.statusText);
      error.response = response;
      throw error;
    }
  }, error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(response => response.json())
  .then(comments => dispatch(addComments(comments)))
  .catch(error => dispatch(commentsFailed(error.message)));
};  // This function is thunk that return function.

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

//////////////////Fetch Promotions//////////////////////
export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + 'promotions')
  .then(response => {
    if(response.ok){
      return response;
    }
    else{
      var error = new Error('Error '+response.status+': '+response.statusText);
      error.response =response;
      throw error;
    }
  },error => {
    var errmess = new Error(error.message);
    throw errmess;
  })
  .then(response => response.json())
  .then(promotions => dispatch(addPromos(promotions)))
  .catch(error => { dispatch(promsoFailed(error.message))});
};  // This function is thunk that return function.

export const promosLoading = () => ({type: ActionTypes.PROMOS_LOADING});

export const addPromos = (promotions) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promotions
});

export const promsoFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

/////////////Fetch Leaders//////////////

export const fetchLeaders = () => (dispatch) => {
  dispatch(loadingLeader(true));
  return fetch(baseUrl + 'leaders').then(response => {
    if(response.ok){
      return response.json();
    }
    else {
      var error = new Error('Error '+response.status+': '+response.statusText);
      throw error;
    }
  }).then(response => {dispatch(addLeader(response))})
    .catch(error => {dispatch(loadingFailed(error.message))});
}

export const loadingLeader = () => ({
  type: ActionTypes.LEADERS_LOADING
});

export const loadingFailed = (message) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: message
});

export const addLeader = (message) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: message
});
