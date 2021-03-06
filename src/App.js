import './App.css';
import Catalogue from './Catalogue';
import MovieDetails from './MovieDetails';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import a Link component
import { Link } from 'react-router-dom';


const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
        <header>
          <Link to={`/`}>
            <h1>Hackflix</h1>
          </Link>

        </header>
        <Route exact path="/" component={Catalogue} />
        <Route exact path="/movie/:movieId" component={MovieDetails} />
      </div>
    </Router>
  );
}

export default App;
