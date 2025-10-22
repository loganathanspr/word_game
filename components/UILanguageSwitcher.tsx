import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SUPPORTED_UI_LANGUAGES } from '../lib/translations';

const UILanguageSwitcher: React.FC = () => {
    const { language, setLanguage, t } = useLanguage();

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };

    return (
        <div className="relative">
            <label htmlFor="ui-language-select" className="sr-only">{t('uiLanguageLabel')}</label>
            <select
                id="ui-language-select"
                value={language}
                onChange={handleLanguageChange}
                className="bg-slate-700 text-white text-sm rounded-md focus:ring-teal-500 focus:border-teal-500 block w-full pl-3 pr-10 py-1.5 appearance-none"
            >
                {SUPPORTED_UI_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                        {lang.name}
                    </option>
                ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-300">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </div>
        </div>
    );
};

export default UILanguageSwitcher;
