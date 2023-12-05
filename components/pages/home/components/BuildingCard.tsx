import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import { format } from 'date-fns';
import { useStyles } from '../styles/sxBuildingCardStyles';
import { buildingDevTimes } from '../../../../constants/app/buildings-dev-constants';
import useTranslation from '../../../../hooks/translation/useTranslation';
import styles from '../../../commonLayout/Header/Header.module.scss';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { useRouter } from 'next/router';
import { AllRoutes } from '../../../../constants/routes/routes';
import { OpenInBrowser } from '@mui/icons-material';
import { BuildingCard } from '../../../../typesDefs/constants/app/buildings/buildings.types';
interface BuildingCardProps {
  item: Partial<BuildingCard>;
}

export default function BuildingCard({ item }: BuildingCardProps) {
  const classes = useStyles();
  const { t } = useTranslation();
  const fContext = useFetchingContext();
  const router = useRouter();

  const handleViewMore = () => {
    router.push(AllRoutes.BUILDING_PAGE + '/' + item._id);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.address + t('share.building.title'),
          text: t('share.building.text'),
          url: AllRoutes.BUILDING_PAGE + '/' + item._id
        });
      } catch (error) {
        console.error('error in share', error);
      }
    } else {
      console.log('cant share...');
    }
  };

  return (
    <Card className={classes.cardContainer}>
      <CardMedia
        component="img"
        height="194"
        style={{ background: '#e7e7e7' }}
        src={fContext.imageHandler(
          item.media && item.media?.length > 0 ? item?.media[0].link : '',
          '/buildings/'
        )}
        alt="building-image"
        className={classes.image}
      />
      <CardContent>
        <Typography
          className={classes.title2}
          fontWeight={'bold'}
          color="text.secondary"
        >
          {item.address}
        </Typography>
        <Typography className={classes.price} color="text.secondary">
          {item?.price && item?.price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}
        </Typography>
        <Typography className={classes.squareMeters} color="text.secondary">
          <b>{t('pages.home.squareMeters')}</b>{': '}{item.squareMeters}{'m²'}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }} disableSpacing>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
        <div className={styles.genericButton} onClick={handleViewMore}>
          {t('pages.home.viewMore')}
        </div>
      </CardActions>
    </Card>
  );
}
