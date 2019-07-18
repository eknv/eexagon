import { merge } from 'lodash';
import { default as Auth } from './auth';
import { default as Post } from './post';

export default merge(Auth, Post);
