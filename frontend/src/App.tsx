import React, { useState } from 'react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import NavBar from './components/NavBar';
import './App.css';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "Welcome to React": "Welcome to React and react-i18next"
        }
      },
      zh: {
        translation: {
          "Welcome to React": "你们还"
        }
      }
    },
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

const App: React.FC = () => {
  const { t } = useTranslation();
  const [english, setEnglish] = useState(true);

  function handleToggle() {
    i18n.changeLanguage(!english ? "en-US" : "zh-CN")
    setEnglish(prev => !prev);
  }

  return (
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <p>{t("Welcome to React")}</p>
      <button onClick={handleToggle}>toggle</button>
    </div>
  );
}

export default App;