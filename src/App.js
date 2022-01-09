import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Reset from "./Update/Reset";
import Dashboard from "./Dashboard/Dashboard";
import UpdateProfile from "./Update/UpdateProfile";
import PasswordUpdate from "./Update/PasswordUpdate";

function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/updateprofile" component={UpdateProfile} />
          <Route exact path="/passwordupdate" component={PasswordUpdate} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
