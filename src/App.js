import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.scss';
import UsersList from "./views/Users";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
      <Router>
        <div className="App">
            <UsersList />
        </div>
      </Router>
  );
}

export default App;
