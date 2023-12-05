/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect, useState } from 'react';
import { arraySplitter } from '../../../utils/helpers/array-splitter';
import SwipeableViews from 'react-swipeable-views';
import styles from './styles/ReactCarousel.module.scss';
import getItemQty from './helpers/get-items-qty';
import { ArrowBack, Warning } from '@mui/icons-material';
import { Typography } from '@mui/material';

type PropTypes = {
  data: any[];
  componentToRender: React.FC<any>;
  skeletonComponentToRender: React.FC<any>;
  loading?: boolean;
  error?: string;
};

const SwipeableViewsTyped: any = SwipeableViews as any;

const ReactCarousel = ({
  data,
  componentToRender,
  skeletonComponentToRender,
  loading,
  error
}: PropTypes) => {
  const SkeletonComponent = skeletonComponentToRender;
  const Component = componentToRender;
  const layouts = [
    {
      min: 361,
      itemQty: 1
    },
    {
      min: 601,
      itemQty: 1
    },
    {
      min: 750,
      itemQty: 2
    },
    {
      min: 1100,
      itemQty: 3
    },
    {
      min: 1201,
      itemQty: 3
    }
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const [itemQty, setItemQty] = useState(
    getItemQty(
      typeof window !== 'undefined' ? window.innerWidth : 1200,
      layouts
    )
  );

  const handleOnAutoScroll = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const handleResize = () => {
      setItemQty(getItemQty(window.innerWidth, layouts));
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const splittedData = useCallback(() => {
    return arraySplitter(data, itemQty);
  }, [itemQty, data]);

  const handleClick = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      return prevIndex < splittedData().length - 1 ? prevIndex + 1 : 0;
    });
  }, [splittedData]);

  const handleClickReduce = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      return prevIndex > 0 ? prevIndex - 1 : 0;
    });
  }, [splittedData]);

  return (
    <div className={styles.carouselContainer}>
      {loading && (
        <SwipeableViewsTyped
          style={{ width: '100%' }}
          containerStyle={{ width: '100%' }}
          enableMouseEvents
        >
          <div className={styles.carouselSlide}>
            {Array(itemQty)
              .fill(3)
              .map((_, index: number) => {
                return <SkeletonComponent key={index} />;
              })}
          </div>
        </SwipeableViewsTyped>
      )}
      {splittedData().length > 1 && (
        <div className={styles.leftButton} onClick={handleClickReduce}>
          <ArrowBack sx={{ color: '#fff' }} />
        </div>
      )}
      {data.length > 0 && !loading && (
        <>
          <SwipeableViewsTyped
            style={{ width: '100%' }}
            containerStyle={{ width: '100%' }}
            enableMouseEvents
            index={currentIndex}
            onChangeIndex={handleOnAutoScroll}
          >
            {splittedData().map((item, index) => (
              <div className={styles.carouselSlide} key={index}>
                {item.map((renderedItem: any) => {
                  return (
                    <Component item={renderedItem} key={renderedItem._id} />
                  );
                })}
              </div>
            ))}
          </SwipeableViewsTyped>
        </>
      )}
      {splittedData().length > 1 && (
        <div className={styles.rightButton} onClick={handleClick}>
          <ArrowBack sx={{ color: '#fff', transform: 'rotateZ(180deg)' }} />
        </div>
      )}
      {error && (
        <div className={styles.carouselSlide}>
          <div className={styles.error}>
            <Warning style={{ fontSize: 100, color: '#7a7a7a' }} />
            <Typography variant="h6" style={{ color: '#7a7a7a' }}>
              {typeof error == 'string' ? error : 'error'}
            </Typography>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReactCarousel;
