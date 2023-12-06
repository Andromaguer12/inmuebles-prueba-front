/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useStyles } from '../styles/AdminPanelStyles';
import Logo from '../../../../assets/pages/home/logoNoBackground.png';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '../../../../services/redux/store';
import { getAllBuildings } from '../../../../services/redux/reducers/home/buildings/actions';
import { convertObjToRequestParams } from '../../../../utils/helpers/convert-obj-to-request-params';
import useFetchingContext from '../../../../contexts/backendConection/hook';
import { BuildingCard } from '../../../../typesDefs/constants/app/buildings/buildings.types';
import { Add, Delete, Edit, ErrorOutline } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import CreateBuildingModal from './CreateBuildingModal';
import { format } from 'date-fns';

interface Data {
  address: string;
  firstMedia: string;
  name: string;
  price: number;
  createdAt: number;
  actions: any;
  id: string;
}

function createData(
  address: string,
  firstMedia: string,
  name: string,
  price: number,
  createdAt: number,
  actions: any,
  id: string,
  ): Data {
  return {
    address,
    firstMedia,
    name,
    price,
    createdAt,
    actions,
    id
  };
}



function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: true,
    label: 'Address',
  },
  {
    id: 'firstMedia',
    numeric: false,
    disablePadding: true,
    label: 'First Media',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: true,
    label: 'Price',
  },
  {
    id: 'createdAt',
    numeric: true,
    disablePadding: false,
    label: 'Created at',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
  openModal: () => any
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, openModal } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h5"
          id="tableTitle"
          component="div"
        >
          Buildings
        </Typography>
      )}
      <Tooltip title="Add">
        <IconButton onClick={openModal}>
          <Add />
        </IconButton>
      </Tooltip>
    </Toolbar>
  );
}
export default function AdminPanel() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const classes = useStyles()
  const dispatch = useAppDispatch()
  const fContext = useFetchingContext();

  const [open, setOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<null | BuildingCard>(null)

  const {
    getBuildings: {
      loadingBuildings,
      dataBuildings,
      pageInfoBuildings,
      errorBuildings,
    },
    createBuilding: {
      successCreateBuilding,
    },
    updateBuildingById: {
      successUpdateBuilding,
    },
  } = useAppSelector(({ buildings }) => buildings)

  useEffect(() => {
    if(successCreateBuilding || successUpdateBuilding) {
      dispatch(getAllBuildings({
        context: fContext,
        filters: convertObjToRequestParams({
          page,
          limit: rowsPerPage
        })
      }))
    }
  }, [successCreateBuilding, successUpdateBuilding, page, rowsPerPage])

  useEffect(() => {
    dispatch(getAllBuildings({
      context: fContext,
      filters: convertObjToRequestParams({
        page,
        limit: rowsPerPage
      })
    }))
  }, [page, rowsPerPage])

  const rows = (dataBuildings ?? []).map((item: BuildingCard) => {
    const handleThisEdit = () =>{
      setSelectedItem(item);
      setOpen(true);
    }

    return createData(
      item.address,
      item.media && item.media?.length ? item.media[0].link : 'No media', 
      item.name, 
      item?.price ? item?.price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }) : '', 
      item.createdAt ?? 0, 
      <>
        <IconButton onClick={handleThisEdit} color='success'>
          <Edit />
        </IconButton>
        <IconButton color='error'>
          <Delete />
        </IconButton>
      </>, 
      item._id
    )
  })
  

  const handleRequestSort = (
    _event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box className={classes.container}>
      <Box className={classes.header}>
        <Box>
          <Typography variant='h1' className={classes.title}>
            Admin panel
          </Typography>
          <Typography className={classes.subtitle}>
            Manage buildings
          </Typography>
        </Box>
        <Box className={classes.logoAndSearch}>
          <Image
            src={Logo}
            className={classes.image}
            alt={'inmuebles-sol-logo'}
          />
        </Box>
      </Box>
      {loadingBuildings && <Box className={classes.subBox}>
        <CircularProgress sx={{color:"#ffffff"}} size={50} />
        <Typography sx={{ color: "#ffffff"}}>
          Loading...
        </Typography>
      </Box>}
      {errorBuildings && <Box className={classes.subBox}>
        <ErrorOutline sx={{ color: "#ffffff", fontSize: '100px'}} />
        <Typography sx={{ color: "#ffffff"}}>
          {typeof errorBuildings === 'string' ? errorBuildings : JSON.stringify(errorBuildings)}
        </Typography>
      </Box>}
      {!loadingBuildings && <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar openModal={() => setOpen(!open)} numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.id as string);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell> */}
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="left">{row.address}</TableCell>
                    <TableCell align="left">{row.firstMedia}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.createdAt ? format(new Date(row.createdAt), 'dd/MM/yyyy') : 'No Date'}</TableCell>
                    <TableCell align="right">{row.actions}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>}
      <CreateBuildingModal
        open={open}
        setOpen={setOpen}
        setSelectedItem={setSelectedItem}
        item={selectedItem}
      />
    </Box>
  );
}
