import { useAppSelector } from '../../hooks';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Main from '../main/main';
import Favorites from '../favorites/favorites';
import Login from '../login/login';
import OfferDetailCard from '../offer/offer-detail-card';
import Page404 from '../page404/page404';
import PrivateRoute from '../private-route/private-route';
import Loading from '../loading/loading';


function App(): JSX.Element | null {
  const isLoading = useAppSelector((state) => state.isDataLoading);
  const authStatus = useAppSelector((state) => state.authStatus);

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
          <PrivateRoute authStatus={authStatus}>
            <Favorites />
          </PrivateRoute>
        }
        />
        <Route path="/offer/:id" element={<OfferDetailCard />}/>
        <Route path="*" element={<Page404 />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
