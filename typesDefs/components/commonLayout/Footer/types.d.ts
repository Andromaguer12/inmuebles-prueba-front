import { StaticImageData } from 'next/image';
import { HeaderButtonsType } from '../Header/types';

export type FooterLinkItem = {
  link: string;
  name: string;
};

export interface FooterSectionsInterface {
  name: string;
  title?: string;
  text?: string;
  itemsList?: HeaderButtonsType[];
  image?: string | StaticImageData;
  showLogo?: boolean;
  alignRight: boolean;
  brandLogo?: string | StaticImageData;
  hideInResponsive?: boolean;
}
