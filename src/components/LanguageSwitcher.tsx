/** Load dependencies */
import React from "react";
import { useTranslation } from "react-i18next";

/** Load components */
import Select from "./Select";

/** Configs */
const languages = ["en", "de"];

/** Component */
const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  return (
    <div className="select">
      <Select
        name="language-switcher"
        className="is-uppercase"
        data={languages}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        selected={i18n.language}
      />
    </div>
  );
};

export default LanguageSwitcher;
