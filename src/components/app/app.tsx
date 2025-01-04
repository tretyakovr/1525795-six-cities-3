import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { AuthStatus } from '../../const';
import Main from '../../pages/main/main';
import Favorites from '../../pages/favorites/favorites';
import Login from '../../pages/login/login';
import Offer from '../../pages/offer/offers';
import Page404 from '../../pages/page404/page404';
import PrivateRoute from '../private-route/private-route';


type AppProps = {
  offersCount: number;
}


function App({offersCount} : AppProps): JSX.Element | null {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main offersCount = {offersCount} />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/favorites" element={
          <PrivateRoute authStatus={AuthStatus.NoAuth}>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path="/offer/:id" element={<Offer />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
