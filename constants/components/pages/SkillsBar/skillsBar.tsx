/* eslint-disable react/react-in-jsx-scope */
import { FeatureCardBarSectionsInterface } from '../../../../typesDefs/components/pages/FeatureCard/types';
import { CheckCircleOutline, CurrencyBitcoin, PersonPinCircleOutlined } from '@mui/icons-material';

export const BuildingBarSections: FeatureCardBarSectionsInterface[] = [
  {
    icon: <PersonPinCircleOutlined sx={{ width: 50, height: 50 }} />,
    title: 'Asesoría personalizada',
    subtitle: 'Te ayudamos a encontrar el inmueble que mejor se adapte a ti'
  },
  {
    icon: <CurrencyBitcoin sx={{ width: 50, height: 50 }} />,
    title: 'Financiamiento flexible',
    subtitle: 'Te ofrecemos facilidades de pago para que puedas comprar tu inmueble'
  },
  {
    icon: <CheckCircleOutline sx={{ width: 50, height: 50 }} />,
    title: 'Garantía de calidad',
    subtitle: 'Te garantizamos que nuestros inmuebles cumplen con los más altos estándares'
  }
]

