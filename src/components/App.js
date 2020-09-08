import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Settings from './Settings';
import SendMessage from './SendMessage';
import ReportingStatus from './reporting/ReportingStatus';
import Header from './Header';

const App = () => {

  return (
    <React.Fragment>
      <CssBaseline />

      <BrowserRouter>
        <Header />
        <Route path='/' exact component={Settings}/>
        <Route path='/settings' exact component={Settings}/>
        <Route path='/send' exact component={SendMessage}/>
        <Route path='/report' exact component={ReportingStatus}/>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default (App);
