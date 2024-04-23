import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import DefaultNavbar from './components/default-navbar/DefaultNavbar';
import DefaultSidebar from './components/default-sidebar/DefaultSidebar';
import Components from './views/Components';
import NotFound from './views/NotFound';
import ListUsers from './views/ListUsers';

function App() {
    const [menuIsOpen, setMenuIsOpen] = useState(true);

    const handleMenuStatusChange = (isExpanded) => {
        setMenuIsOpen(isExpanded)
    };

    return (
        <BrowserRouter>
            <div className="App">
                <DefaultNavbar></DefaultNavbar>
                <DefaultSidebar onMenuStatusChange={handleMenuStatusChange}/>

                <div className={`container-data ${menuIsOpen ? 'menu-open' : 'menu-close'}`}>
                    <div className="container">
                        <Routes>
                            <Route path="/componentes" element={<Components />} />
                            <Route path="/usuarios" element={<ListUsers />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
