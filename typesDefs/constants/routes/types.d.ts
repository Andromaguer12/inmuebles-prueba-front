export type RouteDeclaration = {
  path: string;
  exact: boolean;
};

export type AppRoutesObject = {
  ADMIN: string;
  HOME: string;
  ABOUTME: string;
  ALL_PROJECTS: string;
};

export type RoutesClassification = {
  PRIVATE: {
    ADMIN_DASHBOARD: RouteDeclaration;
  };
  PUBLIC: {
    HOME: RouteDeclaration;
    BUILDING_PAGE: RouteDeclaration;
    ADMIN: RouteDeclaration;
  };
};
