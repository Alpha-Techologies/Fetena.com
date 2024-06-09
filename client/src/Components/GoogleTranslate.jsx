// GoogleTranslate.js
import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    const addScript = () => {
      const script = document.createElement("script");
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    const initTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "en,am,om,ti" },
          "google_translate_element"
        );
      }
    };

    // Ensure window.googleTranslateElementInit is defined
    window.googleTranslateElementInit = initTranslate;

    addScript();
  }, []);

  return <div id="google_translate_element" className=""></div>;
};

export default GoogleTranslate;
