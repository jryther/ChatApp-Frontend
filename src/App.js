import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navigation,
          VideoCallPage,
          Account,
          Footer,
          Login,
          Signup,
          EditAccount } from "./components";

function App() {

  return (
      <div className="App" style={{ height: "100%" }}>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path='/VideoCallPage' exact component={VideoCallPage} />
            <Route path='/Account' exact component={Account} />
            <Route path='/Signup' component={Signup} />
            <Route path='/EditAccount' component={EditAccount} />
          </Switch>
          <Footer />
        </Router>
        <Footer />
      </div>
  );
}

export default App;