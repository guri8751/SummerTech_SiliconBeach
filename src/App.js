import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Reset from "./Reset";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile";
import PasswordUpdate from "./PasswordUpdate";

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
