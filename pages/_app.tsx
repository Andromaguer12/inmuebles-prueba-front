import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
import store, { useAppDispatch } from '../services/redux/store';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode';
import { setUserDataFromToken } from '../services/redux/reducers/user/actions';

const translations = {
  es,
  en
};

const Module = ({ nextAPI }: { nextAPI: AppProps }) => {
  const router = useRouter();
  const { Component, pageProps } = nextAPI;
  const token = Cookies.get("accessToken");
  const dispatch = useAppDispatch()

  const handleRefreshSession = async (tok: string) => {
    if(tok){
      const decoded = jwtDecode(tok)

      dispatch(setUserDataFromToken(decoded))
    }
  }
 
  useEffect(() => {
    handleRefreshSession(token);
  }, [token])
  

  if (
    router.pathname === AllRoutes.HOME ||
    router.pathname.includes(AllRoutes.BUILDING_PAGE)
  ) {
    return (
      <DashboardHome showHeader showFooter>
        <Component {...pageProps} />
      </DashboardHome>
    );
  }

  if (
    router.pathname === AllRoutes.ADMIN_LOGIN
  ) {
    return (
      <DashboardHome>
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
