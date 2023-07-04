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

//By using useMemo, the binding of action creators to the dispatch function will only occur when the dispatch function changes, optimizing the performance of the useActions hook.
