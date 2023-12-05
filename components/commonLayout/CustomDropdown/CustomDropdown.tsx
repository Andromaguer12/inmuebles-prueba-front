/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Fade,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Popper,
  PopperPlacementType,
  Typography
} from '@mui/material';
import React, { useState, useEffect, SetStateAction } from 'react';
import useStyles from './styles/customDropdownStyles';
import { ArrowBack, Inbox } from '@mui/icons-material';
import useTranslation from '../../../hooks/translation/useTranslation';

interface CustomDropdownListProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  position: PopperPlacementType;
  listData: Partial<ListItemsProps>[];
  closeDropdown: () => void;
}

interface ListItemsChild {
  name: string;
  label: string;
  icon: SVGAElement | undefined;
  link: string | undefined;
}

interface ListItemsProps {
  name: string;
  label: string;
  link: string | undefined;
  function: () => void;
  icon: SVGAElement | undefined;
  childs: ListItemsChild[] | undefined;
}

const CustomDropdown: React.FC<CustomDropdownListProps> = ({
  anchorEl,
  open,
  position,
  listData,
  closeDropdown
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [HoveringItem, setHoveringItem] = useState<HTMLElement | null>(null);
  const [childsFromItem, setChildsFromItem] = useState<ListItemsProps | null>(
    null
  );
  const openSubList = Boolean(HoveringItem);

  const handleHover = (
    event: any,
    thereAreChilds: any[],
    item: Partial<ListItemsProps>
  ) => {
    if (thereAreChilds) {
      setHoveringItem(HoveringItem ? null : (event.target as HTMLElement));
      setChildsFromItem(item as SetStateAction<ListItemsProps | null>);
    } else {
      setHoveringItem(null);
      setChildsFromItem(null);
    }
  };

  useEffect(() => {
    if (!open) {
      setHoveringItem(null);
      setChildsFromItem(null);
    }
  }, [open]);

  const handleDismissDropdown = () => {
    closeDropdown();
  };

  return (
    <>
      {open && (
        <div
          className={classes.dismissBox}
          onClick={handleDismissDropdown}
        ></div>
      )}
      <Popper
        open={open}
        anchorEl={anchorEl}
        placement={position}
        className={classes.popper}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div className={classes.container}>
              <List>
                {listData.map((item) => (
                  <>
                    <ListItemButton
                      key={item.name}
                      onClick={item?.function ?? (() => {})}
                    >
                      <div className={classes.listItemContainer}>
                        {item.childs && (
                          <div
                            className={classes.dropdownMenuArea}
                            onMouseEnter={(e) =>
                              handleHover(e, item?.childs as any[], item)
                            }
                          ></div>
                        )}
                        <div>
                          {item.icon && (
                            <ListItemIcon>
                              <Inbox />
                            </ListItemIcon>
                          )}
                          <Typography className={classes.itemText}>
                            {t(item.label as string)}
                          </Typography>
                        </div>
                        {item.childs && (
                          <ArrowBack sx={{ transform: 'rotateZ(270deg)' }} />
                        )}
                      </div>
                    </ListItemButton>
                    {childsFromItem?.childs && openSubList && (
                      <Popper
                        open={openSubList}
                        anchorEl={HoveringItem}
                        placement={'right-start'}
                        className={classes.popper}
                        transition
                      >
                        {({ TransitionProps }) => (
                          <Fade {...TransitionProps} timeout={350}>
                            <div className={classes.subContainer}>
                              <List>
                                {(childsFromItem?.childs ?? []).map(
                                  (subitem) => (
                                    <ListItem button key={subitem.name}>
                                      {subitem.icon && (
                                        <ListItemIcon>
                                          <Inbox />
                                        </ListItemIcon>
                                      )}
                                      <Typography className={classes.itemText}>
                                        {t(subitem?.label)}
                                      </Typography>
                                    </ListItem>
                                  )
                                )}
                              </List>
                            </div>
                          </Fade>
                        )}
                      </Popper>
                    )}
                  </>
                ))}
              </List>
            </div>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default CustomDropdown;
