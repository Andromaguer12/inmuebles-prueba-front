/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import styles from '../styles/BuildingPage.module.scss';
import { autoPlay } from 'react-swipeable-views-utils';
import SwipeableViews from 'react-swipeable-views';
import {
  useAppDispatch,
  useAppSelector
} from '../../../../services/redux/store';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { getBuildingById, getSimilarBuildings } from '../../../../services/redux/reducers/home/buildings/actions';
import { Avatar, Button, Skeleton, Typography } from '@mui/material';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { ShoppingCart, Warning, ZoomIn } from '@mui/icons-material';
import { format } from 'date-fns';
import Image from 'next/image';
import ImageZoomer from '../../../commonLayout/ImageZoomer/ImageZoomer';
import { convertObjToRequestParams } from '../../../../utils/helpers/convert-obj-to-request-params';
import ReactCarousel from '../../../commonLayout/ReactCarousel/ReactCarousel';
import BuildingCard from '../../home/components/BuildingCard';
import SkeletonBuildingCard from '../../home/components/SkeletonBuildingCard';
import { BuildingMediaCard } from '../../../../typesDefs/constants/app/buildings/buildings.types';

interface BuildingPageProps {
  buildingId: string;
}

const AutoSwipeableViews: any = autoPlay(SwipeableViews);

const BuildingPage = ({ buildingId }: BuildingPageProps) => {
  const dispatch = useAppDispatch();
  const fContext = useFetchingContext();
  const { t } = useTranslation();

  const [hoveringImage, setHoveringImage] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomImage, setZoomImage] = useState<string>('')

  const {
    getBuildingById: {
      loadingBuildingById,
      // currentBuilding,
      errorBuildingById
    },
    getSimilarBuildings: {
      loadingSimilar,
      buildingSimilar,
      errorBuildingSimilar
    }
  } = useAppSelector(({ buildings }) => buildings);

  const currentBuilding = {
    _id: '2',
    address: 'AVENIDA BARCELONA 34',
    description: 'PISO MODERNO',
    squareMeters: 100,
    media: [],
    name: 'PISO EN AVENIDA BARCELONA',
    price: 500000
  }

  useEffect(() => {
    if (buildingId) {
      dispatch(
        getBuildingById({
          context: fContext,
          buildingId
        })
      );
    }
  }, [buildingId]);

  useEffect(() => {
    if(currentBuilding) {
      const payload = {
        technologies: currentBuilding?.technologies && currentBuilding?.technologies.length ? currentBuilding?.technologies : null,
        restrictId: buildingId
      }

      // dispatch(getSimilarBuildings({
      //   context: fContext,
      //   filters: convertObjToRequestParams(payload)
      // }))
    } 
  }, [currentBuilding, buildingId])
  

  const handleOnAutoScroll = (index: number) => {
    setCurrentIndex(index);
  };

  const shadowClick = (image: string) => {
    setZoomImage(image)
  }

  return (
    <>
      <div className={styles.buildingPageContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.buildingCardImages}>
            {loadingBuildingById && (
              <>
                <div className={styles.sectionTitle}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem' }}
                    width={'200px'}
                  />

                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1rem' }}
                    width={'120px'}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={'100%'}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={'50%'}
                />
                <Skeleton variant="text" width={'100%'} height={'100%'} />
              </>
            )}
            {!loadingBuildingById && !errorBuildingById && (
              <>
                {currentBuilding?.media &&
                    currentBuilding?.media.length > 0 && <AutoSwipeableViews
                  style={{ width: '100%', height: '75%' }}
                  containerStyle={{
                    width: '100%',
                    height: '100%',
                    background: '#e7e7e7'
                  }}
                  enableMouseEvents
                  onChangeIndex={handleOnAutoScroll}
                >
                  {currentBuilding?.media &&
                    currentBuilding?.media.length > 0 &&
                    currentBuilding?.media.map((image: BuildingMediaCard) => (
                      <div className={styles.carouselSlide} onMouseEnter={() => setHoveringImage(true)} onMouseLeave={() => setHoveringImage(false)} key={image._id}>
                        <img
                          className={styles.image}
                          src={fContext.imageHandler(image.link, '/buildings/')}
                          style={{ marginRight: '5px' }}
                          alt={image.name}
                        />
                        {hoveringImage && <div className={styles.zoomShadow} onClick={() => shadowClick(fContext.imageHandler(image.link, '/buildings/'))}>
                          <ZoomIn sx={{ color: "#ffffff", fontSize: 50 }} />
                        </div>}
                      </div>
                    ))}
                </AutoSwipeableViews>}
                {currentBuilding?.media &&
                    currentBuilding?.media.length > 0 && <div className={styles.dots}>
                  {currentBuilding?.media &&
                    currentBuilding?.media.length > 0 &&
                    currentBuilding?.media.map(
                      (image: BuildingMediaCard, index: number) => (
                        <div
                          className={
                            currentIndex === index
                              ? styles.dot__selected
                              : styles.dot
                          }
                          key={image._id}
                        />
                      )
                    )}
                </div>}
              </>
            )}
            {errorBuildingById && (
              <div className={styles.error}>
                <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
                <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                  {typeof errorBuildingById == 'string'
                    ? errorBuildingById
                    : 'error'}
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.buildingInfoCard}>
            {(loadingBuildingById || errorBuildingById) && (
              <>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '2rem' }}
                  width={'100%'}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '30px' }}
                  width={80}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={80}
                />
                <div className={styles.ownerCard}>
                  <Skeleton
                    variant="circular"
                    width={50}
                    height={50}
                    className={styles.avatar}
                  />
                  <div className={styles.ownerInfo}>
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={'80%'}
                    />
                    <Skeleton
                      variant="text"
                      sx={{ fontSize: '1rem' }}
                      width={'80px'}
                    />
                  </div>
                </div>
                <div className={styles.horizontalDivider} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={80}
                />
                <div className={styles.descriptionContainer}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'100%'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '1.2rem' }}
                    width={'50%'}
                  />
                </div>
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '10px' }}
                  width={120}
                />
                <div className={styles.buildingTypes}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '2rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                </div>
                <div className={styles.horizontalDivider} />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem', marginBottom: '0px' }}
                  width={80}
                />
                <div className={styles.usedTechnologies}>
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: '3rem', marginRight: '10px' }}
                    width={'50px'}
                  />
                </div>
              </>
            )}
            {currentBuilding && (
              <>
                <Typography className={styles.title}>
                  {currentBuilding?.address}
                </Typography>
                <Typography
                  className={styles.subtitles}
                  sx={{ marginBottom: ' 30px' }}
                >
                  {t('pages.buildingPage.buildingInfo')}
                </Typography>
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.description')}
                </Typography>
                <div className={styles.descriptionContainer}>
                  <Typography className={styles.description}>
                    {t(currentBuilding?.description ?? 'No description')}
                  </Typography>
                </div>
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.details')}
                </Typography>
                <Typography className={styles.squareMeters}>
                  {currentBuilding?.squareMeters}{'m²'}
                </Typography>
                <div className={styles.horizontalDivider} />
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.price')}
                </Typography>
                <Typography className={styles.price}>
                  {currentBuilding?.price && currentBuilding?.price.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </Typography>

                <Button 
                  color='primary' 
                  fullWidth 
                  variant='contained' 
                  endIcon={<ShoppingCart />}
                  disableElevation
                  sx={{ padding: '10px 20px', marginTop: '30px'}}
                  >
                  {t('pages.buildingPage.button.buy')}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <ImageZoomer 
        open={Boolean(zoomImage)}
        image={zoomImage}
        close={() => setZoomImage('')}
      />
      {(loadingSimilar || errorBuildingSimilar || buildingSimilar?.length > 0) && <div className={styles.parentContainer}>
        <div className={styles.maxContainer}>
          <div className={styles.mixedBuildingsContainer}>
            <div className={styles.sectionTitle}>
              <p className={styles.title}>
                {t('pages.buildingPage.otherBuildingsTitle')}
              </p>

              <p className={styles.section}>
                {t('pages.home.aboutUs.buildings.section')}
              </p>
            </div>
            <p className={styles.text}>{t('pages.buildingPage.otherBuildingsText')}</p>
            {/* <ReactCarousel
              data={buildingSimilar}
              componentToRender={BuildingCard}
              skeletonComponentToRender={SkeletonBuildingCard}
              loading={loadingSimilar}
              error={errorBuildingSimilar}
            /> */}
          </div>
        </div>
      </div>}
    </>
  );
};

export default BuildingPage;
