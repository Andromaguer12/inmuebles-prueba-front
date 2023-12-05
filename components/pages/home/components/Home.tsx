import React from 'react'
import styles from '../styles/Home.module.scss'
import background from '../../../../assets/pages/home/background.jpg'
import Image from 'next/image'
import { Pagination, Typography } from '@mui/material'
import useTranslation from '../../../../hooks/translation/useTranslation'
import ReactCarousel from '../../../commonLayout/ReactCarousel/ReactCarousel'
import BuildingCard from './BuildingCard'
import SkeletonBuildingCard from './SkeletonBuildingCard'
import { useAppSelector } from '../../../../services/redux/store'
import { BuildingBarSections } from '../../../../constants/components/pages/SkillsBar/skillsBar';
import FeatureCard from './FeatureCard'

const Home = () => {
  const  { t } = useTranslation()

  const { getBuildings: { loadingBuildings, dataBuildings, pageInfoBuildings, errorBuildings } } = useAppSelector(({ buildings }) => buildings)

  return (
    <>
      <div className={styles.homePageContainer}>
        <Image 
          src={background}
          alt="background-image"
          className={styles.imageContainer}
        />
        <div className={styles.shadow}>
          <div className={styles.texts}>
            <Typography variant='h1' className={styles.titles}>
              {t('pages.home.mainTitle')}
            </Typography>
            <Typography variant='h6' className={styles.titles}>
              {t('pages.home.mainSubtitle')}
            </Typography>
          </div>
        </div>
      </div>
      <div className={styles.skillsInfoContainer}>
        <div className={styles.maxContainer}>
          {BuildingBarSections.map((d) => {
            return <FeatureCard key={d.title} item={d} />;
          })}
        </div>
      </div>
      <div className={styles.aboutUsContainer} id="projects-container">
        <div className={styles.maxContainer}>
          <div className={styles.mixedProjectsContainer}>
            <div className={styles.sectionTitle}>
              <p className={styles.title}>
                {t('pages.home.buildingsTitle')}
              </p>

              <p className={styles.section}>
                {t('pages.home.buildingsTitle.section')}
              </p>
            </div>
            <div className={styles.buildings}>
              {!loadingBuildings && dataBuildings && dataBuildings.map((item) => {
                return <BuildingCard key={item.id} item={item} />
              })}
              <div className={styles.paginationContainer}>
                <Pagination onChange={(e, newValue) => console.log(newValue)} count={10} variant="outlined" color="primary" />
              </div>
            </div>
            {/* <ReactCarousel
              data={}
              componentToRender={BuildingCard}
              skeletonComponentToRender={SkeletonBuildingCard}
              loading={loadingBuildings}
              error={errorBuildings}
            /> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home