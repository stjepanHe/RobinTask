import axios from 'axios';
import { Dispatch } from 'redux';
import { ActionTypes } from '../action-types/index';

const UserUrl = 'http://localhost:8080/data';

interface WorkingHours {
  start: string;
  end: string;
  time_zone: string;
}

interface Event {
  id: number;
  title: string;
  start: string;
  end: string;
}

export interface User {
  user_id: number;
  user_name: string;
  working_hours?: WorkingHours;
  time_zone?: string;
  events?: Event[];
}

export interface FetchToDoUserRequest {
  type: ActionTypes.USER_RESULT_REQUEST;
}

export interface FetchToDoUserSuccess {
  type: ActionTypes.USER_RESULT_SUCCESS;
  payload: User[];
}

export interface FetchToDoUserFailure {
  type: ActionTypes.USER_RESULT_FAILURE;
  error: string;
}
export type FetchToDoUserAction =
  | FetchToDoUserRequest
  | FetchToDoUserSuccess
  | FetchToDoUserFailure;

export const fetchToDoUser = () => {
  return async (dispatch: Dispatch<FetchToDoUserAction>): Promise<void> => {
    dispatch({ type: ActionTypes.USER_RESULT_REQUEST });

    try {
      const response = await axios.get(UserUrl);
      const data: User[] = response.data;
      console.log(response.data);
      dispatch({
        type: ActionTypes.USER_RESULT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ActionTypes.USER_RESULT_FAILURE,
        error: 'Error fetching data for Users',
      });
    }
  };
};
