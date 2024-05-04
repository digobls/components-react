import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import DefaultNavbar from './components/defaultNavbar/DefaultNavbar';
import DefaultSidebar from './components/defaultSidebar/DefaultSidebar';
import Components from './views/examples/Components';
import NotFound from './views/NotFound';
import ListUsers from './views/crud/ListUsers';
import Form from './views/Form';
import CreateUser from './views/crud/CreateUser';

function App() {
    const [menuIsOpen, setMenuIsOpen] = useState(true);

    const handleMenuStatusChange = (isExpanded) => {
        setMenuIsOpen(isExpanded);
    };

    return (
        <BrowserRouter>
            <div className="App">
                <DefaultNavbar></DefaultNavbar>
                <DefaultSidebar onMenuStatusChange={handleMenuStatusChange}/>

                <div className={`container-data ${menuIsOpen ? 'menu-open' : 'menu-close'}`}>
                    <div className="container">
                        <Routes>
                            Formulário
                            <Route path="/componentes" element={<Components />} />
                            <Route path="/form" element={<Form />} />
                            <Route path="/usuarios" element={<ListUsers />} />
                            <Route path="/usuarios/cadastro" element={<CreateUser />} />
                            <Route path="/usuarios/editar/:id" element={<CreateUser />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
