/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { BuildingCard } from '../../../../typesDefs/constants/app/buildings/buildings.types';
import { styled } from '@mui/styles';
import { CloudUpload } from '@mui/icons-material';
import styles from '../styles/CreateBuildingModal.module.scss'
import { TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store';
import { createBuilding, updateBuildingById } from '../../../../services/redux/reducers/home/buildings/actions';
import useFetchingContext from '../../../../contexts/backendConection/hook';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

interface CreateBuildingModalProps {
  item?: Partial<BuildingCard> | any,
  open: boolean, 
  setOpen: React.Dispatch<React.SetStateAction<boolean>> | any,
  setSelectedItem: React.Dispatch<React.SetStateAction<null>> | any
}

export default function CreateBuildingModal({ open, setOpen, setSelectedItem, item }: CreateBuildingModalProps) {
  const handleClose = () => {
    setOpen(false)
    setSelectedItem(null)
  };
  const dispatch = useAppDispatch()
  const fContext = useFetchingContext()

  const {
    createBuilding: {
      loadingCreateBuilding,
      successCreateBuilding,
      errorCreateBuilding,
    },
    updateBuildingById: {
      loadingUpdateBuilding,
      successUpdateBuilding,
      errorUpdateBuilding,
    },
  } = useAppSelector(({ buildings }) => buildings)

  useEffect(() => {
    if(successCreateBuilding || successUpdateBuilding) {
      handleClose()
    }
  }, [successCreateBuilding, successUpdateBuilding])
  

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const form = new FormData(e.target);
    
    if(item) {
      const object = {};
      form.forEach((value, key) => object[key] = value);


      dispatch(updateBuildingById({
        context: fContext,
        projectId: item._id,
        body: object
      }))
    } else {

      dispatch(createBuilding({
        context: fContext,
        body: form
      }))
    }
  }

  return (
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <Fade in={open}>
            <Box sx={style}>
              <Typography variant="h6" component="h2">
                {item ? "Edit Building" : "Create Building"} 
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2, mb: 2 }}>
                {item ? "Edit the current Building" : "Create a new complete Building"} 
              </Typography>
              <div className={styles.textInputs}>
                <div className={styles.column}>
                  <Typography className={styles.formLabel}>
                    Address
                  </Typography>
                  <TextField
                    name="address"
                    id="address"
                    variant="outlined"
                    className={styles.textFields}
                    defaultValue={item?.address ?? ''}
                    fullWidth
                    sx={{ background: '#ffffff', borderRadius: '4px', mb: 2 }}
                  />
                </div>
                <div className={styles.column}>
                  <Typography className={styles.formLabel}>
                    Name
                  </Typography>
                  <TextField
                    name="name"
                    id="name"
                    variant="outlined"
                    className={styles.textFields}
                    defaultValue={item?.name ?? ''}
                    fullWidth
                    sx={{ background: '#ffffff', borderRadius: '4px', mb: 2 }}
                  />
                </div>
              </div>
              <div className={styles.textInputs}>
                <div className={styles.column}>
                  <Typography className={styles.formLabel}>
                    Square Meters
                  </Typography>
                  <TextField
                    name="squareMeters"
                    id="squareMeters"
                    variant="outlined"
                    type="number"
                    className={styles.textFields}
                    defaultValue={item?.squareMeters ?? 0}
                    fullWidth
                    sx={{ background: '#ffffff', borderRadius: '4px', mb: 2 }}
                  />
                </div>
                <div className={styles.column}>
                  <Typography className={styles.formLabel}>
                    Price
                  </Typography>
                  <TextField
                    name="price"
                    id="price"
                    variant="outlined"
                    type="number"
                    defaultValue={item?.price ?? 0}
                    className={styles.textFields}
                    fullWidth
                    sx={{ background: '#ffffff', borderRadius: '4px', mb: 2 }}
                  />
                </div>
              </div>
              <Typography className={styles.formLabel}>
                Description
              </Typography>
              <TextField
                name="description"
                id="description"
                multiline
                variant="outlined"
                className={styles.textFields}
                defaultValue={item?.description ?? ''}
                fullWidth
                sx={{ background: '#ffffff', borderRadius: '4px', mb: 2 }}
              />
              {!item && <div className={styles.files}>
                <Button component="label" variant="contained" sx={{ mr: 2}} startIcon={<CloudUpload />}>
                  Upload file
                  <VisuallyHiddenInput name="files" multiple type="file" />
                </Button>
                <Typography className={styles.formLabel}>
                  Please select files
                </Typography>
              </div>}
              <Button type="submit" variant="contained" fullWidth sx={{ mt: 2, p: 1.5 }}>
                {(loadingCreateBuilding || loadingUpdateBuilding)
                  ? "Loading"
                  : (errorCreateBuilding || errorUpdateBuilding) 
                    ? <>{errorCreateBuilding ?? errorUpdateBuilding}</> 
                    : <>{item ? "Edit Building" : "Create Building"}</>
                }
              </Button>
            </Box>
          </Fade>
        </form>
      </Modal>
  );
}
