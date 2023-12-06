import { FooterSectionsInterface } from '../../../../typesDefs/components/commonLayout/Footer/types';
import { HeaderButtons } from '../Header/header';
import Logo from '../../../../assets/pages/home/logoNoBackground.png';

export const FooterSections: Partial<FooterSectionsInterface>[] = [
  {
    name: 'navigation',
    title: 'pages.commonLayout.footer.navigation',
    text: 'pages.commonLayout.footer.navigationText',
    itemsList: HeaderButtons,
    hideInResponsive: true
  },
  {
    name: 'last',
    showLogo: true,
    alignRight: true,
    brandLogo: Logo
  }
];
