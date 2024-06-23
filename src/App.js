import React from 'react';
import ReclamationPage from './pages/ReclamationPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ReponsePage from './pages/ReponsePage';

function App() {
  return (
    <div className="App">
      <ReclamationPage />
    </div>
  );
}

export default App;



function App() {
  return (
    <div className="App">
      {/* Supposons que vous ayez un ID de réclamation */}
      <ReponsePage reclamationId="123" />
    </div>
  );
}

export default App;




function App() {
  return (
    <Router>
      <Switch>
        <Route path="/reponse/:reclamationId" component={ReponsePage} />
        {/* Autres routes */}
      </Switch>
    </Router>
  );
}

export default App;