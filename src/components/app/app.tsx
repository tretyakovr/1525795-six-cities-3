import { useAppDispatch } from '../../hooks';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import OfferDetailCard from '../offer/offer-detail-card';
import Page404 from '../page404/page404';
import PrivateRoute from '../private-route/private-route';
import { checkAuthAction } from '../../store/api-actions';


function App(): JSX.Element | null {
  const dispatch = useAppDispatch();
  dispatch(checkAuthAction());

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/favorites" element={
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path="/offer/:id" element={<OfferDetailCard />} />
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
