import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import Reset from "./Update/Reset";
import Dashboard from "./Dashboard/Dashboard";
import UpdateProfile from "./Update/UpdateProfile";
import PasswordUpdate from "./Update/PasswordUpdate";
import Companies from "./Companies/Companies";
import UpdatePicture from "./Dashboard/UpdatePicture";
import MyNetwork from "./Companies/MyNetwork";
import IndividualCompany from "./MyNetwork/IndividualCompany";
import Home from "./Home/Home";

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
          <Route exact path="/companies" component={Companies} />
          <Route exact path="/updatepicture" component={UpdatePicture} />
          <Route exact path="/network" component={MyNetwork} />
          <Route exact path="/individualcompany" component={IndividualCompany} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
