import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import UILanguageSwitcher from './UILanguageSwitcher';

const Header: React.FC = () => {
  const { t } = useLanguage();

  return (
    <header className="w-full max-w-md text-center mb-8 relative">
       <div className="absolute top-0 right-0">
         <UILanguageSwitcher />
       </div>
      <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500 pt-12">
        {t('appTitle')}
      </h1>
      <p className="text-slate-400 mt-2">{t('appSubtitle')}</p>
    </header>
  );
};

export default Header;
