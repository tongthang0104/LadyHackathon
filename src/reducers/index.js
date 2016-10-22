import { combineReducers } from 'redux';
import PostsReducer from './emailReducer';

const rootReducer = combineReducers({
 posts: PostsReducer
});

export default rootReducer;
