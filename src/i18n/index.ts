import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import pt from 'i18n/pt.json';
import es from 'i18n/es.json';

i18n
  .use( initReactI18next )
  .init( {
    resources: { es: { translation: es }, pt: { translation: pt } },
    lng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  } );
  

export default i18n;
