import React, {useEffect, useState} from 'react'
import styles from '../styles/Home.module.scss'
import background from '../../../../assets/pages/home/background.jpg'
import Image from 'next/image'
import { MenuItem, Pagination, Select, Typography } from '@mui/material'
import useTranslation from '../../../../hooks/translation/useTranslation'
import BuildingCard from './BuildingCard'
import SkeletonBuildingCard from './SkeletonBuildingCard'
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store'
import { BuildingBarSections } from '../../../../constants/components/pages/SkillsBar/skillsBar';
import FeatureCard from './FeatureCard'
import { Warning } from '@mui/icons-material'
import { convertObjToRequestParams } from '../../../../utils/helpers/convert-obj-to-request-params'
import { getAllBuildings } from '../../../../services/redux/reducers/home/buildings/actions'
import useFetchingContext from '../../../../contexts/backendConection/hook'

const Home = () => {
  const  { t } = useTranslation()
  const dispatch = useAppDispatch()

  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(8)
  const fContext = useFetchingContext()

  useEffect(() => {
    console.log(rowsPerPage)
    dispatch(getAllBuildings({
      context: fContext,
      filters: convertObjToRequestParams({
        page,
        limit: rowsPerPage
      })
    }))
  }, [page, rowsPerPage])

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
            {loadingBuildings && (
              <div className={styles.buildings}>
                {Array(6).fill(1).map((_i, index) => (
                  <SkeletonBuildingCard key={index} />
                ))}
              </div>
            )}
            {!loadingBuildings && <div className={styles.buildings}>
              {!loadingBuildings && dataBuildings && dataBuildings.map((item) => {
                return <BuildingCard key={item._id} item={item} />
              })}
              <div className={styles.paginationContainer}>
                <Select
                  value={rowsPerPage}
                  size='small'
                  sx={{ marginRight: '20px' }}
                  onChange={(e) => {
                    setRowsPerPage(e.target.value as number)
                  }}
                >
                  <MenuItem value={8}>8</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={32}>32</MenuItem>
                </Select>
                <Pagination onChange={(_e, newValue) => setPage(newValue)} count={pageInfoBuildings?.totalPages} variant="outlined" color="primary" />
              </div>
            </div>}
            {errorBuildings && (
              <div className={styles.error}>
                <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
                <Typography variant="h6" style={{ color: '#7a7a7a' }}>
                  {typeof errorBuildings == 'string' ? errorBuildings : 'error'}
                </Typography>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home