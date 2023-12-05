import { SxProps, Theme } from '@mui/material';

export const styles = {
  icons: {
    marginRight: '10px',
    fontSize: '17px'
  } as SxProps<Theme>,
  collapsesTextTitles: {
    fontSize: '15px',
    fontFamily: 'Source Code Pro',
    fontWeight: 700
  },
  collapseItem: {
    borderBottom: '1px solid #000',
    padding: '20px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
};
