import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import DashboardHome from '../components/commonLayout/Dashboard/DashboardHome';
import { AllRoutes } from '../constants/routes/routes';
import '../constants/styling/global.css';
import { IntlProvider } from 'react-intl';
import es from '../lang/es.json';
import en from '../lang/en.json';
import { ThemeProvider } from '@mui/material';
import theme from '../constants/styling/theme/muiTheme';
import FetchingContext from '../contexts/backendConection/context';
import BackendFetching from '../services/backendConection/class';
import store from '../services/redux/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const translations = {
  es,
  en
};

const Module = ({ nextAPI }: { nextAPI: AppProps }) => {
  const router = useRouter();
  const { Component, pageProps } = nextAPI;

  if (
    router.pathname.includes(AllRoutes.HOME) ||
    router.pathname.includes('/view')
  ) {
    return (
      <DashboardHome showHeader showFooter>
        <Component {...pageProps} />
      </DashboardHome>
    );
  }

  return <Component {...pageProps} />;
};
export default function MyApp(props: AppProps) {
  const { locale, locales } = useRouter();
  const backendFetchingClass = new BackendFetching();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IntlProviderTyped: any = IntlProvider;

  // here we can add contexts like the backend context, and we can also add providers for sass or antd
  return (
    <Provider store={store}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FetchingContext.Provider value={backendFetchingClass}>
          <ThemeProvider theme={theme}>
            <IntlProviderTyped
              locale={locale as string}
              messages={translations[locale as keyof typeof locales]}
            >
              <Module nextAPI={props} />
            </IntlProviderTyped>
          </ThemeProvider>
        </FetchingContext.Provider>
      </LocalizationProvider>
    </Provider>
  );
}
