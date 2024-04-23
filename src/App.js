import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import {BrowserRouter as Router} from 'react-router-dom';
import {useState} from 'react';
import UsersList from "./views/Users";
import DefaultNavbar from './components/default-navbar/DefaultNavbar';
import DefaultSidebar from './components/default-sidebar/DefaultSidebar';

function App() {
    const [menuIsOpen, setMenuIsOpen] = useState(true);

    const handleMenuStatusChange = (isExpanded) => {
        console.log('isExpanded', isExpanded);
        setMenuIsOpen(isExpanded)
    };

    return (
        <Router>
            <div className="App">
                <DefaultNavbar></DefaultNavbar>
                <DefaultSidebar onMenuStatusChange={handleMenuStatusChange}/>

                <div className={`container-data ${menuIsOpen ? 'menu-open' : 'menu-close'}`}>
                    <div className="container">
                        <UsersList/>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
