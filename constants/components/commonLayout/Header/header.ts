import { HeaderButtonsType } from '../../../../typesDefs/components/commonLayout/Header/types';
import { AllRoutes } from '../../../routes/routes';

export const HeaderButtons: HeaderButtonsType[] = [
  {
    id: 'about-us',
    link: AllRoutes.HOME,
    name: 'pages.header.home'
  },
  // {
  //   id: 'about-us',
  //   link: AllRoutes.ABOUTUS,
  //   name: 'pages.header.about-us',
  //   toDiv: 'about-us'
  // }
];
