import {
  ExpandMore,
  Instagram,
  KeyboardDoubleArrowUpOutlined,
  LinkedIn,
  MusicNote,
  WhatsApp
} from '@mui/icons-material';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { FooterSections } from '../../../constants/components/commonLayout/Footer/footer';
import useTranslation from '../../../hooks/translation/useTranslation';
import styles from './styles/Footer.module.scss';
import {
  AlternateEmailOutlined,
  LocalPhoneOutlined,
  LocationOnOutlined
} from '@mui/icons-material';
import { FooterIcons } from '../../../typesDefs/components/commonLayout/Footer/enums';
import { styles as sxStyles } from './styles/sxStyles';
import {
  CardContent,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  Typography
} from '@mui/material';
import { useRouter } from 'next/router';
import { AllRoutes } from '../../../constants/routes/routes';

const FooterItemsIcons = {
  [FooterIcons.Address]: <LocationOnOutlined sx={sxStyles.icons} />,
  [FooterIcons.Phone]: <LocalPhoneOutlined sx={sxStyles.icons} />,
  [FooterIcons.Email]: <AlternateEmailOutlined sx={sxStyles.icons} />,
  [FooterIcons.Whatsapp]: <WhatsApp sx={sxStyles.icons} />,
  [FooterIcons.LinkedIn]: <LinkedIn sx={sxStyles.icons} />,
  [FooterIcons.Instagram]: <Instagram sx={sxStyles.icons} />,
  [FooterIcons.TikTok]: <MusicNote sx={sxStyles.icons} />
};

export default function Footer() {
  const { t } = useTranslation();
  const query = useRouter();

  const [openedCollapses, setOpenedCollapses] = useState<string[]>([]);

  const handleGoToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleRedirectToSection = (elementId?: string) => {
    if((query.pathname.split('/')[1]) === ''){
      if (elementId?.includes('https')) {
        if (typeof window !== 'undefined') window.open(elementId);
      } else {
        const element = document.getElementById(elementId ?? '');
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    }
    else {
      query.push(AllRoutes.HOME+'#'+elementId)
    }
  };

  const handleOpenCollapse = useCallback(
    (coll: string) => {
      if (openedCollapses.includes(coll)) {
        setOpenedCollapses([...openedCollapses].filter((o) => o !== coll));
      } else {
        setOpenedCollapses([...openedCollapses].concat([coll]));
      }
    },
    [openedCollapses]
  );

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* TODO: add the functionality to scroll to top */}
        <div className={styles.button} onClick={handleGoToTop}>
          <KeyboardDoubleArrowUpOutlined
            style={{ fontSize: '30px' }}
            color="primary"
          />
          <p>{t('footer.button.top')}</p>
        </div>
      </div>
      <List
        className={styles.containerResponsiveList}
        sx={{ width: '100%', paddingTop: '0px' }}
      >
        {FooterSections.filter((sec) => sec.hideInResponsive).map((section) => {
          return (
            <React.Fragment key={section.title}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={sxStyles.collapseItem}
                  onClick={() => handleOpenCollapse(section.name as string)}
                >
                  <Typography sx={sxStyles.collapsesTextTitles}>
                    {t(section?.title as string)}
                  </Typography>
                  <ExpandMore
                    sx={{
                      transition: 'all 500ms ease',
                      transform: openedCollapses.includes(
                        section.name as string
                      )
                        ? 'rotateZ(180deg)'
                        : ''
                    }}
                  />
                </ListItemButton>
              </ListItem>
              <Collapse
                in={openedCollapses.includes(section.name as string)}
                timeout="auto"
                unmountOnExit
              >
                <CardContent className={styles.delimeter}>
                  <div
                    className={styles.containersResponsive}
                    style={{
                      alignItems: section.alignRight ? 'flex-end' : 'flex-start'
                    }}
                  >
                    {section.showLogo && (
                      <div className={styles.logoIconFooter}>
                        {section?.image && (
                          <Image
                            src={section?.image as string}
                            className={styles.image}
                            alt={section.name as string}
                          />
                        )}
                      </div>
                    )}
                    <div
                      className={styles.thisHeaders}
                      style={{
                        alignItems: section.alignRight
                          ? 'flex-end'
                          : 'flex-start'
                      }}
                    >
                      {section.text && (
                        <p
                          className={styles.text}
                          style={{
                            fontSize: section.alignRight ? '11px' : '',
                            marginRight: section.alignRight ? '10px' : '0'
                          }}
                        >
                          {t(section?.text)}
                        </p>
                      )}
                    </div>
                    {section?.itemsList && (
                      <div className={styles.thisHeaders}>
                        {section?.itemsList?.map((item) => (
                          <div
                            className={
                              item.icon
                                ? styles.listItems__noBold
                                : styles.listItems
                            }
                            onClick={() =>
                              handleRedirectToSection(item.toDiv ?? item.link)
                            }
                            key={item.id}
                          >
                            {item.icon && <>{FooterItemsIcons[item.icon]}</>}
                            <p>
                              {!item.icon ? '• ' : ''}
                              {item.noTranslate ? item.name : t(item.name)}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                    {section?.brandLogo && (
                      <div className={styles.brandLogoContainer}>
                        <Image
                          src={section?.brandLogo as string}
                          className={styles.brandlogoImage}
                          alt={section.name as string}
                        />
                        <p className={styles.text}>- BY ANDRES CARRASQUERO -</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
      <div className={styles.delimeter}>
        {FooterSections.map((section, i) => {
          return (
            <React.Fragment key={i}>
              <div
                className={
                  section.hideInResponsive
                    ? styles.containersHideInResponsive
                    : styles.containers
                }
                style={{
                  alignItems: section.alignRight ? 'flex-end' : 'flex-start'
                }}
              >
                {section.showLogo && (
                  <div className={styles.logoIconFooter}>
                    {section?.image && (
                      <Image
                        src={section?.image as string}
                        className={styles.image}
                        alt={section.name as string}
                      />
                    )}
                  </div>
                )}
                <div
                  className={styles.thisHeaders}
                  style={{
                    alignItems: section.alignRight ? 'flex-end' : 'flex-start'
                  }}
                >
                  {section.title && (
                    <p className={styles.title}>{t(section?.title)}</p>
                  )}
                  {section.text && (
                    <p
                      className={styles.text}
                      style={{
                        fontSize: section.alignRight ? '11px' : '',
                        marginRight: section.alignRight ? '10px' : '0'
                      }}
                    >
                      {t(section?.text)}
                    </p>
                  )}
                </div>
                {section?.itemsList && (
                  <div className={styles.thisHeaders}>
                    {section?.itemsList?.map((item) => (
                      <div
                        className={
                          item.icon
                            ? styles.listItems__noBold
                            : styles.listItems
                        }
                        onClick={() =>
                          handleRedirectToSection(item.toDiv ?? item.link)
                        }
                        key={item.id}
                      >
                        {item.icon && <>{FooterItemsIcons[item.icon]}</>}
                        <p>
                          {!item.icon ? '• ' : ''}
                          {item.noTranslate ? item.name : t(item.name)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {section?.brandLogo && (
                  <div className={styles.brandLogoContainer}>
                    <Image
                      src={section?.brandLogo as string}
                      className={styles.brandlogoImage}
                      alt={section.name as string}
                    />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles.bottom}>
        <div className={styles.delimiter}>
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </div>
  );
}
