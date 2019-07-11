import React, { useState } from 'react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useAuth0 } from "./react-auth0-wrapper";
import ReactFlagsSelect from 'react-flags-select';

import NavBar from './components/NavBar';
import translations from './translations.json';

import Home from './pages/Home';
import Groups from './pages/Groups';
import Events from './pages/Events';

import 'react-flags-select/css/react-flags-select.css';
import './App.css';
import { Box } from '@material-ui/core';

interface languages {
  [name: string]: string;
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

const App: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, loading, user, getTokenSilently, loginWithRedirect, logout } = useAuth0();

  function handleCountry(countryCode: string) {
    const languages: languages = {
      US: "en-US",
      CN: "zh-CN"
    }
    i18n.changeLanguage(languages[countryCode])
  }

  async function authRequest(event: React.MouseEvent<EventTarget>, callback: (event: React.MouseEvent<EventTarget>) => void) {
    const apiHost: string = "http://localhost:4000";
    let token: string;
    try {
      token = await getTokenSilently();
    } catch (error) {
      token = "";
    }
    console.log(token);
    let response: Response = await fetch(apiHost + "/api/v1/auth", {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    let json = await response.json();
    console.log(json);
    callback(event);
  }

  return (
    <Router>
      <div className="App">
        <header>
          <NavBar auth={{
            isAuthenticated,
            loading,
            user,
            loginWithRedirect,
            logout,
            authRequest,
            getTokenSilently
          }}
          >
            <ReactFlagsSelect 
              countries={["US", "CN"]} 
              customLabels={{"US": "English","CN": "中文"}} 
              placeholder="Select Language" 
              showSelectedLabel={false}
              defaultCountry="US"
              selectedSize={18}
              onSelect={handleCountry}/>
          </NavBar>
        </header>
        <Box marginTop={8}>
          <Route exact path="/" component={ Home }/>
          <Route path="/groups" component={ Groups }/>
          <Route path="/events" component={ Events }/>
        </Box>
      </div>
    </Router>
  );
}

export default App;