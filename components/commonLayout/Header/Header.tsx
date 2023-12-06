import {
  Language,
  MenuOpen,
} from '@mui/icons-material';
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Typography,
  SwipeableDrawer
} from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from './Header.module.scss';
import useTranslation from '../../../hooks/translation/useTranslation';
import { HeaderButtons } from '../../../constants/components/commonLayout/Header/header';
import Logo from '../../../assets/pages/home/logoNoBackground.png';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { AllRoutes } from '../../../constants/routes/routes';
import CustomDropdown from '../CustomDropdown/CustomDropdown';
import useStyles from './sxStyles';

export default function Header() {
  const { t } = useTranslation();
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopper = Boolean(anchorEl);
  const classes = useStyles();

  const handleChangeLanguaje = (lang: string) => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  const modelsListData = [
    {
      name: 'en',
      label: 'English',
      function: () => handleChangeLanguaje('en')
    },
    {
      name: 'es',
      label: 'Español',
      function: () => handleChangeLanguaje('es')
    }
  ];

  const handleListItemClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(anchorEl ? null : (event.target as HTMLElement));
  };

  const handleRedirectToSection = (elementId?: string, close?: boolean) => {
    const element = document.getElementById(elementId ?? '');
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });

      if (close) setOpenDrawer(false);
    }
  };

  const handleRedirect = (route: string) => {
    if (route) {
      router.push(route)
      setOpenDrawer(false)
    }
  }

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setOpenDrawer(open);
    };

  return (
    <>
      <div className={[
          styles.headerContainer, 
          router.pathname === '/' && styles.withBackground,
        ].join(' ')}>
        <div className={styles.delimeter}>
          <div className={[
            styles.logoAndSearch,
            router.pathname.includes('building') && styles.withBackground,
          ].join(' ')}>
            <Image
              src={Logo}
              className={styles.image}
              alt={'inmuebles-sol-logo'}
            />
          </div>
          <div className={styles.buttons}>
            {AllRoutes.HOME.includes(router.pathname) ? (
              <>
                {HeaderButtons.map((button) => {
                  return (
                    <div
                      key={button.id}
                      className={[
                        styles.headerButton,
                        router.pathname.includes('building') ? styles.secondaryStyle : '',
                      ].join(' ')}
                      onClick={() => button.toDiv ? handleRedirectToSection(button?.toDiv) : handleRedirect(button.link)}
                    >
                      {t(button.name)}
                    </div>
                  );
                })}
              </>
            ) : (
              <Link className={[
                styles.headerButton,
                router.pathname.includes('building') ? styles.secondaryStyle : '',
              ].join(' ')} href={AllRoutes.HOME}>
                {t('pages.projectPage.backToHome')}
              </Link>
            )}
            <IconButton
              onClick={handleListItemClick}
              className={styles.iconButtons}
            >
              <Language style={{ color: !router.pathname.includes('building') ? '#fff' : '#1769a8' }} />
            </IconButton>
            <CustomDropdown
              anchorEl={anchorEl}
              listData={modelsListData}
              position={'bottom'}
              open={openPopper}
              closeDropdown={() => {
                setAnchorEl(null);
              }}
            />
          </div>

          <div className={styles.responsiveButtons}>
            <IconButton
              onClick={handleListItemClick}
              className={styles.iconButtons}
            >
              <Language style={{ color: '#fff' }} />
            </IconButton>
            <CustomDropdown
              anchorEl={anchorEl}
              listData={modelsListData}
              position={'bottom'}
              open={openPopper}
              closeDropdown={() => {
                setAnchorEl(null);
              }}
            />
            <IconButton
              className={styles.iconButtons}
              onClick={toggleDrawer(true)}
            >
              <MenuOpen style={{ color: '#fff' }} />
            </IconButton>
          </div>
        </div>
      </div>
      <SwipeableDrawer
        anchor={'right'}
        open={openDrawer}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        classes={{ paper: classes.paper }}
      >
        <List sx={{ width: '100%' }}>
          {AllRoutes.HOME.includes(router.pathname) ? (
            <>
              {HeaderButtons.map((button) => {
                return (
                  <ListItem
                    key={button.id}
                    disablePadding
                    sx={{ width: '100%' }}
                    onClick={() => button.toDiv ? handleRedirectToSection(button?.toDiv, true) : handleRedirect(button.link)}
                  >
                    <ListItemButton sx={{ width: '100%' }}>
                      <Typography className={classes.itemTexts}>
                        {t(button.name)}
                      </Typography>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </>
          ) : (
            <ListItem className={styles.headerButton} disablePadding>
              <Link className={styles.headerButton} href={AllRoutes.HOME}>
                <ListItemButton>
                  <Typography className={classes.itemTexts}>
                    {t('pages.projectPage.backToHome')}
                  </Typography>
                </ListItemButton>
              </Link>
            </ListItem>
          )}
        </List>
      </SwipeableDrawer>
    </>
  );
}
