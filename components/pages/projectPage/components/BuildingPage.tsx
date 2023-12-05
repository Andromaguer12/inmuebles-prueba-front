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
import { Avatar, Skeleton, Typography } from '@mui/material';
import useTranslation from '../../../../hooks/translation/useTranslation';
import { Warning, ZoomIn } from '@mui/icons-material';
import { format } from 'date-fns';
import allTechnologies, {
  technologies
} from '../../../../constants/app/all-technologies';
import Image from 'next/image';
import { AboutMeCardImage } from '../../../../typesDefs/constants/app/about-us/about-us.types';
import ImageZoomer from '../../../commonLayout/ImageZoomer/ImageZoomer';
import { convertObjToRequestParams } from '../../../../utils/helpers/convert-obj-to-request-params';
import ReactCarousel from '../../../commonLayout/ReactCarousel/ReactCarousel';
import BuildingCard from '../../home/components/BuildingCard';
import SkeletonBuildingCard from '../../home/components/SkeletonBuildingCard';

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
    getSpecificBuilding: {
      loadingSpecificBuilding,
      buildingData,
      errorSpecificBuilding
    },
    getSimilarBuildings: {
      loadingSimilar,
      buildingSimilar,
      errorBuildingSimilar
    }
  } = useAppSelector(({ buildings }) => buildings);

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
    if(buildingData) {
      const payload = {
        technologies: buildingData?.technologies && buildingData?.technologies.length ? buildingData?.technologies : null,
        restrictId: buildingId
      }

      dispatch(getSimilarBuildings({
        context: fContext,
        filters: convertObjToRequestParams(payload)
      }))
    } 
  }, [buildingData, buildingId])
  

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
            {loadingSpecificBuilding && (
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
            <div className={styles.sectionTitle}>
              <p className={styles.title}>{t('pages.buildingPage.title')}</p>

              <p className={styles.section}>{t('pages.buildingPage.section')}</p>
            </div>
            <p className={styles.text}>{t('pages.buildingPage.text')}</p>
            {!loadingSpecificBuilding && !errorSpecificBuilding && (
              <>
                <AutoSwipeableViews
                  style={{ width: '100%', height: '75%' }}
                  containerStyle={{
                    width: '100%',
                    height: '100%'
                  }}
                  enableMouseEvents
                  onChangeIndex={handleOnAutoScroll}
                >
                  {buildingData?.images &&
                    buildingData?.images.length > 0 &&
                    buildingData?.images.map((image: AboutMeCardImage) => (
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
                </AutoSwipeableViews>
                <div className={styles.dots}>
                  {buildingData?.images &&
                    buildingData?.images.length > 0 &&
                    buildingData?.images.map(
                      (image: AboutMeCardImage, index: number) => (
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
                </div>
              </>
            )}
            {errorSpecificBuilding && (
              <div className={styles.error}>
                <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
                <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                  {typeof errorSpecificBuilding == 'string'
                    ? errorSpecificBuilding
                    : 'error'}
                </Typography>
              </div>
            )}
          </div>
          <div className={styles.buildingInfoCard}>
            {(loadingSpecificBuilding || errorSpecificBuilding) && (
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
            {buildingData && (
              <>
                <Typography className={styles.title}>
                  {buildingData?.title}
                </Typography>
                <Typography
                  className={styles.subtitles}
                  sx={{ marginBottom: ' 30px' }}
                >
                  {t('pages.buildingPage.buildingInfo')}
                </Typography>
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.participation')}
                </Typography>
                <div className={styles.ownerCard}>
                  <Avatar
                    src={fContext.imageHandler(
                      buildingData.owner?.image,
                      '/user-images/'
                    )}
                    style={{ background: '#8b6e0b', width: 50, height: 50 }}
                  >
                    {buildingData.owner?.name[0]}
                  </Avatar>
                  <div className={styles.ownerInfo}>
                    <Typography className={styles.name}>
                      {buildingData.owner?.name}
                    </Typography>
                    <div className={styles.header}>
                      <div className={styles.card}>
                        <Typography>Developer</Typography>
                      </div>
                      <div className={styles.subheader}>
                        {buildingData.aproxDate
                          ? format(
                              new Date(buildingData.aproxDate),
                              'dd/MM/yyyy'
                            )
                          : 'dd/MM/yyyy'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.horizontalDivider} />
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.description')}
                </Typography>
                <div className={styles.descriptionContainer}>
                  <Typography className={styles.description}>
                    {t(buildingData?.description ?? 'No description')}
                  </Typography>
                </div>
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.classification')}
                </Typography>
                <div className={styles.buildingTypes}>
                  {buildingData.buildingType?.map((type, index) => {
                    return (
                      <div
                        className={styles.card}
                        key={index}
                        color="text.secondary"
                      >
                        <Typography>
                          {t('pages.home.cards.buildingTypes.' + type)}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
                <div className={styles.horizontalDivider} />
                <Typography className={styles.subtitles2}>
                  {t('pages.buildingPage.technologies')}
                </Typography>
                <div className={styles.usedTechnologies}>
                  {buildingData?.technologies &&
                  buildingData?.technologies.length > 0 ? (
                    <>
                      {buildingData.technologies?.map((tech, index) => {
                        return (
                          <div
                            className={styles.card}
                            key={index}
                            color="text.secondary"
                          >
                            <Image
                              className={styles.image}
                              src={
                                allTechnologies[
                                  technologies.find((t) => t.name === tech)
                                    ?.image as keyof typeof allTechnologies
                                ]
                              }
                              width={20}
                              height={20}
                              style={{ marginRight: '5px' }}
                              alt={
                                technologies.find((t) => t.name === tech)
                                  ?.name ?? ''
                              }
                            />
                            <Typography>
                              {technologies.find((t) => t.name === tech)?.name}
                            </Typography>
                          </div>
                        );
                      })}
                    </>
                  ) : (
                    <Typography className={styles.error}>
                      {t('No technologies')}
                    </Typography>
                  )}
                </div>
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
      {(loadingSimilar || errorBuildingSimilar || buildingSimilar.length > 0) && <div className={styles.parentContainer}>
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
            <ReactCarousel
              data={buildingSimilar}
              componentToRender={BuildingCard}
              skeletonComponentToRender={SkeletonBuildingCard}
              loading={loadingSimilar}
              error={errorBuildingSimilar}
            />
          </div>
        </div>
      </div>}
    </>
  );
};

export default BuildingPage;
