//
// import axios from 'axios';
// import { API_KEY } from '../../config';
// //import { EMAIL } from
//
// export const FETCH_POSTS = 'FETCH_POSTS';
// export const CREATE_POST = 'CREATE_POST';

// const ROOT_URL = `https://api.havenondemand.com/1/${API_KEY}/async/highlighttext/v1?text=${EMAIL}`;
//
// export function fetchPosts() {
//  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);
//
//  return {
//    type: FETCH_POSTS,
//    payload: request
//  };
// }
//
// export function createPost(props) {
// const URL = `/highlight`
//  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, props);
//
//  return {
//    type: CREATE_POST,
//    payload: request
//  };
// }
