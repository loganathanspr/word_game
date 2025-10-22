import React from 'react';
import { SUPPORTED_LANGUAGES } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onChange }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full">
      <label htmlFor="language-select" className="block text-sm font-medium text-slate-300 mb-2">
        {t('selectGameLanguageLabel')}
      </label>
      <select
        id="language-select"
        value={selectedLanguage}
        onChange={onChange}
        className="w-full bg-slate-700 border border-slate-600 text-white text-lg rounded-lg focus:ring-teal-500 focus:border-teal-500 block p-3"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
