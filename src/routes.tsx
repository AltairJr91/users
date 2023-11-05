
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import UsersList from './pages/UsersList';
import Home from './pages/Home';
import NotFound from './shared/components/NotFound';
import SelectedUser from './pages/SelectedUser';


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/userList' element={<UsersList />} />
                <Route path='/userList/:id' element={<SelectedUser/>} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;