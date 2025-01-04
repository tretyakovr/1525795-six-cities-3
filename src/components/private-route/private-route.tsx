import { Navigate } from 'react-router-dom';
import { AppRoutes, AuthStatus } from '../../const';

type PrivateRouteProps = {
  authStatus: AuthStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authStatus, children} = props;

  return (
    authStatus === AuthStatus.Auth ? children : <Navigate to={ AppRoutes.Login }/>
  );
}

export default PrivateRoute;
