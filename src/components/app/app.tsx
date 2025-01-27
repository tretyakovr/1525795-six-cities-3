import { useAppSelector } from '../../hooks';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthStatus } from '../../const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import OfferDetail from '../../pages/offer/offer-detail';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import { favorites } from '../../mocks/favorites';
import Loading from '../../pages/loading/loading';


function App(): JSX.Element | null {
  const isLoading = useAppSelector((state) => state.isDataLoading);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/favorites" element={
          <PrivateRoute authStatus={AuthStatus.Auth}>
            <Favorites favorites={favorites}/>
          </PrivateRoute>
        }
        />
        <Route path="/offer/:id" element={<OfferDetail />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
