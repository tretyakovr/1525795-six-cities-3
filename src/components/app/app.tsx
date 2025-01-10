import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthStatus } from '../../const';
import { Offers } from '../../types/offers';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import OfferDetail from '../../pages/offer/offer-detail';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';
import { favorites } from '../../mocks/favorites';

type AppProps = {
  offers: Offers;
}

function App({offers} : AppProps): JSX.Element | null {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main offers = {offers}/>}/>
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
