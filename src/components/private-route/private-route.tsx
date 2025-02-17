import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { APIActionState, AppRoute, AuthStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthActionState, getAuthStatus } from '../../store/user-data/selectors';
import { checkAuthAction } from '../../store/api-actions';
import Loading from '../loading/loading';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(getAuthStatus);
  const checkAuthActionState = useAppSelector(getAuthActionState);

  useEffect(() => {
    dispatch(checkAuthAction());
  }, [dispatch]);

  if (checkAuthActionState === APIActionState.IDLE || checkAuthActionState === APIActionState.CALL) {
    return (<Loading />);
  }

  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={ AppRoute.Login }/>
  );
}

export default PrivateRoute;
