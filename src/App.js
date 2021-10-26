import { View, Text, StyleSheet, Linking } from "react-native";
import { Provider } from "react-redux";
import configureStore, { history } from "./modules/store/store";
import { ConnectedRouter } from "connected-react-router";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login } from "./components/Login/Login";
import HomePage from "./components/HomePage/HomePage";
import { Profile } from "./components/Profile/Profile";
const store = configureStore({});

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {/* <NativeRouter> */}
          <Router>
            <View>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
            </View>
          </Router>
        </ConnectedRouter>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "ffffff",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default App;
