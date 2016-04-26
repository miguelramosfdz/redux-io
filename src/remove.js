import _ from 'lodash';
import { CALL_API } from 'redux-api-middleware';
import {
  REMOVE_REQUEST,
  REMOVE_SUCCESS,
  REMOVE_ERROR,
  middlewareJsonApiSource,
} from './middleware';

// Action creator used to delete item on api (POST). Config arg is based on CALL_API
// configuration from redux-api-middleware, allowing full customization expect types
// part of configuration. Delete function expects schema name of data which correspond
// with storage reducer with same schema value to listen for deleted data. Item arg
// holds object that you want to pass to api. Tag is not needed because all collection
// with configured schema value as in argument of delete will be invalidated upon successful
// action of deleting item on api.
export default (config, schema, item) => {
  if (!_.isObject(config)) {
    throw new TypeError('Config isn\'t object.');
  }
  if (!_.isString(schema) || _.isEmpty(schema)) {
    throw new Error('Schema is invalid.');
  }
  if (!_.isObject(item)) {
    throw new Error('Item isn\'t object.');
  }
  return {
    [CALL_API]: {
      method: 'DELETE',
      ...config,
      types: [
        REMOVE_REQUEST,
        {
          type: REMOVE_SUCCESS,
          meta: {
            source: middlewareJsonApiSource,
            schema,
            item,
          },
        },
        REMOVE_ERROR,
      ],
    }
  };
};