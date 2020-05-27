import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
  }
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishLoading(true));
  return fetch(baseUrl + 'dishes')
  .then((response) => response.json())
  .then((dishes) => dispatch(addDishes(dishes)));
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

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + 'comments').then(response => response.json()).then(comments => dispatch(addComments(comments)));
};  // This function is thunk that return function.

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments
});

export const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));
  return fetch(baseUrl + 'promotions').then(response => response.json()).then(promotions => dispatch(addPromos(promotions)));
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
