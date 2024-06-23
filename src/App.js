import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReclamationPage from './pages/ReclamationPage';
import ReponsePage from './pages/ReponsePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={ReclamationPage} />
          <Route path="/reponse/:reclamationId" component={ReponsePage} />
          {/* Vous pouvez ajouter d'autres routes ici */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;