import { RoutesClassification } from '../../typesDefs/constants/routes/types';

export const RoutesHeadTitles = {
  ADMIN_LOGIN: 'adminLogin',
  ADMIN_DASHBOARD: 'adminDashboard',
  HOME: 'home',
  PROJECTPAGE: 'project',
  ALLPROJECTS: 'all-projects'
};
export const AllRoutes = {
  ADMIN_LOGIN: '/admin/login',
  ADMIN_DASHBOARD: '/admin/dashboard/:user_uid',
  BUILDING_PAGE: '/building/:id',
  HOME: '/',
};

export const AppRoutes: RoutesClassification = {
  PRIVATE: {
    ADMIN_DASHBOARD: {
      path: AllRoutes.ADMIN_DASHBOARD,
      exact: false
    }
  },
  PUBLIC: {
    HOME: {
      path: AllRoutes.HOME,
      exact: false
    },
    BUILDING_PAGE: {
      path: AllRoutes.HOME,
      exact: false
    },
    ADMIN: {
      path: AllRoutes.ADMIN_LOGIN,
      exact: true
    }
  }
};
