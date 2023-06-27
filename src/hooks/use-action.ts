import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchToDoUser } from '../state/action-creators';
import { useMemo } from 'react';

export const useActions = () => {
  const actionCreators = {
    fetchToDoUser,
  };
  const dispatch = useDispatch();

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch);
  }, [dispatch]);
};
