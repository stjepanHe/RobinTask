import { ActionTypes } from '../state/action-types/index';
import {
  FetchToDoUserRequest,
  FetchToDoUserSuccess,
  FetchToDoUserFailure,
  User,
} from '../state/action-creators/index';

interface UserState {
  loading: boolean;
  error: string | null;
  users: User[] | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  users: null,
};

const userReducer = (
  state: UserState = initialState,
  action: FetchToDoUserRequest | FetchToDoUserSuccess | FetchToDoUserFailure
): UserState => {
  switch (action.type) {
    case ActionTypes.USER_RESULT_REQUEST:
      return { ...state, loading: true, error: null };
    case ActionTypes.USER_RESULT_SUCCESS:
      return { ...state, loading: false, error: null, users: action.payload };
    case ActionTypes.USER_RESULT_FAILURE:
      return { ...state, loading: false, error: action.error, users: null };
    default:
      return state;
  }
};

export default userReducer;
