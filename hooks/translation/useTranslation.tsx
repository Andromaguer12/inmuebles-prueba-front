import { useIntl } from 'react-intl';
import { RoutesHeadTitles } from '../../constants/routes/routes';

type HookReturnedValues = {
  t: (translation: string) => string;
  getTitle: (translation: string) => string;
};

export default function useTranslation(): HookReturnedValues {
  const { formatMessage } = useIntl();

  const t = (translation: string) => {
    return formatMessage({ id: translation });
  };

  const getTitle = (translation: string): string => {
    return t(RoutesHeadTitles[translation as keyof typeof RoutesHeadTitles]);
  };

  return { t, getTitle };
}
