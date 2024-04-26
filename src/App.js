import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {useState} from 'react';
import DefaultNavbar from './components/defaultNavbar/DefaultNavbar';
import DefaultSidebar from './components/defaultSidebar/DefaultSidebar';
import Components from './views/examples/Components';
import NotFound from './views/NotFound';
import ListUsers from './views/ListUsers';
import Form from './views/Form';
import TesteForm from "./views/TesteForm";

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
                            <Route path="/teste" element={<TesteForm />} />
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
