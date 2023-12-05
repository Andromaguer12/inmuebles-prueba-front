/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import styles from './styles/ReactHorizontalAutoCarousel.module.scss';
import Image from 'next/image';
import allTechnologies from '../../../constants/app/all-technologies';
import { v4 as uuidv4 } from 'uuid';

interface propTypes {
  data: {
    image: string;
    name: string;
    title?: string;
  }[];
  scrollerId: string;
  axisX: 'x' | '-x';
  reverse?: boolean;
  noMaxWidth?:boolean;
  component?:any;
}

const ReactHorizontalAutoCarousel = ({
  data,
  scrollerId,
  axisX,
  reverse,
  noMaxWidth, 
  component
}: propTypes) => {
  useEffect(() => {
    const scroller = document.getElementById(scrollerId);

    const addAnimation = () => {
      if (scroller) scroller.setAttribute('data-animated', 'true');

      const scrollerInner: any = scroller?.getElementsByTagName(
        scrollerId + '-item'
      );

      if (scrollerInner && scrollerInner?.length > 0) {
        const scrollerContent = Array.from(scrollerInner?.children);

        scrollerContent.forEach((item: any) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute('aria-hidden', true);
          scrollerInner?.appendChild(duplicatedItem);
        });
      }
    };

    if (
      window
        ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false
    ) {
      addAnimation();
    }
  }, []);

  const RenderComponent = component;

  return (
    <div className={!noMaxWidth ? styles.scroller : [styles.scroller, styles.scroller__noMaxWidth].join(' ')} id={scrollerId}>
      <div
        className={[
          styles.tagList,
          axisX === '-x' ? styles.scroller__inner__x : styles.scroller__inner_x
        ].join(' ')}
      >
        {axisX === 'x' && (
          <>
            {(reverse ? data.reverse() : data).map((tech) => {
              if(component) {
                return <RenderComponent key={tech.name+'-'+ uuidv4()} data={tech} />
              }

              return (
                <div
                  key={tech.name +'-'+ uuidv4()}
                  data-name={scrollerId + '-item'}
                  className={styles.scrollerItem}
                >
                  <Image
                    className={styles.image}
                    src={allTechnologies[tech.image as keyof typeof allTechnologies]}
                    alt={tech.name}
                  />
                </div>
              )
            })}
          </>
        )}
        {(reverse ? data.reverse() : data).map((tech) => {
          if(component) {
            return <RenderComponent key={tech.name+'-'+ uuidv4()} data={tech} />
          }

          return (
            <div
              key={tech.name +'-'+ uuidv4()}
              data-name={scrollerId + '-item'}
              className={styles.scrollerItem}
            >
              <Image
                className={styles.image}
                src={allTechnologies[tech.image as keyof typeof allTechnologies]}
                alt={tech.name}
              />
            </div>
          )
        })}
        {/* {axisX === '-x' && (
          <>
            {(reverse ? data.reverse() : data).map((tech) => (
              <div key={tech.name} className={styles.scrollerItem}>
                <Image
                  className={styles.image}
                  src={
                    allTechnologies[tech.image as keyof typeof allTechnologies]
                  }
                  alt={tech.name}
                />
              </div>
            ))}
          </>
        )} */}
      </div>
    </div>
  );
};

export default ReactHorizontalAutoCarousel;
