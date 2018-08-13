import React, { Component } from "react";
import { connect } from "react-redux";
import { isIE, isBrowser, deviceDetect } from "react-device-detect";
import { login, logout } from "../Actions/Auth_Action";

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PrivetRoute from "./PrivetRoute";
import PublicRoute from "./PublicRoute";

import LoginPage from "../components/Login/LoginPage";
import OnBoarding from "../components/Login/OnBoarding";
import Terms from "../components/Login/Terms";

import DashboardPage from "../components/Dashboard/DashboardPage";
import RecentPage from "../components/Search/RecentPage";
import HighlightsPage from "../components/Search/HighlightsPage";
import DocumentariesPage from "../components/Search/DocumentariesPage";
import FavoritePage from "../components/Search/FavoritePage";
import VideoMain from "../components/Videos/VideoMain";
import SearchPage from "../components/Search/SearchPage";
import NotFoundPage from "../components/NotFoundPage";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

import MobileLanding from "../components/Landings/MobileLanding";
import IELanding from "../components/Landings/IELanding";

class AppRouter extends Component {
  componentWillMount() {
    try {
      const token = localStorage.getItem("token");
      this.props.login(token);
    } catch (e) {
      console.log("out");
      this.props.logout();
    }
    const device = deviceDetect();
    console.log(device);
  }
  render() {
    if (
      deviceDetect().browserName == "IE" ||
      deviceDetect().browserName == "Edge"
    ) {
      return <IELanding />;
    } else if (isBrowser) {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/terms" component={Terms} />
            <Route path="/onboarding" component={OnBoarding} />
            <Route path="/" exact render={() => <Redirect to="/dashboard" />} />
            <Route path="/">
              <div
                style={{
                  position: `relative`,
                  minHeight: `100vh`,
                  margin: `0`
                }}
              >
                <Header />
                <Switch>
                  <Route path="/dashboard" component={DashboardPage} />
                  <Route path="/recent" component={RecentPage} />
                  <Route path="/highlights" component={HighlightsPage} />
                  <Route
                    path="/documentaries"
                    component={DocumentariesPage}
                  />
                  <Route path="/favorite" component={FavoritePage} />
                  <Route path="/video/:id" component={VideoMain} />
                  <Route path="/search/:query" component={SearchPage} />
                </Switch>
                <div style={{ paddingBottom: `50px` }} />
                <Footer />
              </div>
            </Route>

            <Route component={NotFoundPage} />
          </Switch>
        </BrowserRouter>
      );
    } else {
      return <MobileLanding />;
    }
  }
}
const mapDispatchToProps = dispatch => ({
  login: token => dispatch(login(token)),
  logout: () => dispatch(logout())
});
export default connect(undefined, mapDispatchToProps)(AppRouter);
