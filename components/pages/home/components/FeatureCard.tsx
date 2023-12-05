import React from 'react';
import styles from '../styles/Home.module.scss';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { FeatureCardBarSectionsInterface } from '../../../../typesDefs/components/pages/FeatureCard/types';

type PropTypes = {
  item?: FeatureCardBarSectionsInterface;
};

const FeatureCard = ({ item }: PropTypes) => {
  const { t } = useTranslation();
  return (
    <div className={styles.skillCard}>
      {item && (
        <>
          <div className={styles.icon}>{item.icon}</div>
          <div className={styles.texts}>
            <p className={styles.title}>{t(item.title)}</p>
            <p
              className={styles.note}
              dangerouslySetInnerHTML={{ __html: t(item.subtitle) }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default FeatureCard;
