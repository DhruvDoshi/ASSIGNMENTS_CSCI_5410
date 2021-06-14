import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Register from './components/userregister';
import Users from './components/systemuser';
import Navbar from './components/navbar';
import Login from './components/userlogin';


function ServerlessApp() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        <Switch>
          {/* This will connect the application and render the required paths */}
        <Route path="/userlogin" component={Login}>
            <Login></Login>
          </Route>
          <Route path="/userregister" component={Register}>
            <Register></Register>
          </Route>
          <Route path="/systemuser" component={Users}>
            <Users></Users>  
          </Route>  
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default ServerlessApp;
