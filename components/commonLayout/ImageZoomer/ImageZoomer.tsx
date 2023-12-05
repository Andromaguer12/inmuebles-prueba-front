/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import styles from './styles/ImageZoomer.module.scss'
import { Drawer } from '@mui/material'

interface ImageZoomerProps {
  open: boolean;
  close: () => any;
  image: string;
}

const drawerStyle: React.CSSProperties = {
  width: '100vw', 
  height: '100vh', 
  backgroundColor: 'transparent', 
  backdropFilter: 'blur(5px)',
  display: 'flex', 
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
};

const ImageZoomer = ({ open, close, image }: ImageZoomerProps) => {
  const [aspectRatio, setAspectRatio] = useState('')

  const handleLoadImage = (e: React.SyntheticEvent<HTMLImageElement> | any) => {
    const img = e.target;
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const aspectRatio = width / height;

    if (aspectRatio > 1) {
      setAspectRatio(styles.zoomedImage16_9)
    } else if (aspectRatio < 1) {
      setAspectRatio(styles.zoomedImage9_16)
    } else {
      setAspectRatio(styles.zoomedImage9_9)
    }
  }


  return (
    <Drawer open={open} onClose={close} onClick={close} PaperProps={{ style: drawerStyle }} anchor='bottom'>
      <img 
        src={image}
        onLoad={handleLoadImage}
        className={aspectRatio ?? styles.zoomedImage9_9}
        alt='zoomed-image'
      />
    </Drawer>
  )
}

export default ImageZoomer