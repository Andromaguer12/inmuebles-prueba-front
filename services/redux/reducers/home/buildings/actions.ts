/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BuildingCard } from '../../../../../typesDefs/constants/app/buildings/buildings.types';

type initialStateType = {
  getBuildings: {
    loadingBuildings: boolean;
    dataBuildings: BuildingCard[];
    pageInfoBuildings: any;
    errorBuildings: null | any;
  },
  getBuildingById: {
    loadingBuildingById: boolean;
    currentBuilding: BuildingCard | null;
    errorBuildingById: null | any;
  }
};

const hardcoded: BuildingCard[] = [
  {
    _id: '1',
    address: 'CALLE MADRID 12',
    description: 'CASA BONITA',
    squareMeters: 255,
    media: [],
    name: 'CASA EN CALLE MADRID',
    price: 1200000
  },
  {
    _id: '2',
    address: 'AVENIDA BARCELONA 34',
    description: 'PISO MODERNO',
    squareMeters: 100,
    media: [],
    name: 'PISO EN AVENIDA BARCELONA',
    price: 500000
  },
  {
    _id: '3',
    address: 'PLAZA SEVILLA 56',
    description: 'CHALET CON JARDÍN',
    squareMeters: 300,
    media: [],
    name: 'CHALET EN PLAZA SEVILLA',
    price: 1500000
  },
  {
    _id: '4',
    address: 'CALLE GRANADA 78',
    description: 'ÁTICO CON TERRAZA',
    squareMeters: 80,
    media: [],
    name: 'ÁTICO EN CALLE GRANADA',
    price: 400000
  },
  {
    _id: '5',
    address: 'CALLE VALENCIA 90',
    description: 'DÚPLEX CON GARAJE',
    squareMeters: 150,
    media: [],
    name: 'DÚPLEX EN CALLE VALENCIA',
    price: 800000
  },
  {
    _id: '6',
    address: 'CALLE BILBAO 12',
    description: 'LOFT CON VISTAS',
    squareMeters: 60,
    media: [],
    name: 'LOFT EN CALLE BILBAO',
    price: 300000
  }
]


const initialState: initialStateType = {
  getBuildings: {
    loadingBuildings: false,
    dataBuildings: hardcoded ?? [],
    pageInfoBuildings: null,
    errorBuildings: null,
  },
  getBuildingById: {
    loadingBuildingById: false,
    currentBuilding: null,
    errorBuildingById: null,
  }
};

/**
 * extraReducers start
 */

export const getAllBuildings = createAsyncThunk(
  'home/getAllBuildings',
  async (params: any, { rejectWithValue }) => {
    const query = await params.context.getAllBuildings(params?.filters);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);

export const getBuildingById = createAsyncThunk(
  'buildingPage/getBuildingById',
  async (params: { context: any; buildingId: string }, { rejectWithValue }) => {
    const query = await params.context.getBuildingById(params.buildingId);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);

/**
 * extraReducers end
 */

const buildingsSlice = createSlice({
  name: 'buildings',
  initialState,
  reducers: {
    clearBuildings: (state) => {
      state.getBuildings = initialState.getBuildings
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllBuildings.pending, (state) => {
      state.getBuildings.loadingBuildings = true;
    });
    builder.addCase(getAllBuildings.fulfilled, (state, action) => {
      const { buildings, ...rest } = action.payload;

      state.getBuildings.loadingBuildings = false;
      state.getBuildings.dataBuildings = buildings;
      state.getBuildings.pageInfoBuildings = rest;
      state.getBuildings.errorBuildings = '';
    });
    builder.addCase(getAllBuildings.rejected, (state, action) => {
      state.getBuildings.loadingBuildings = false;
      state.getBuildings.errorBuildings = action.payload as string;
    });

    builder.addCase(getBuildingById.pending, (state) => {
      state.getBuildingById.loadingBuildingById = true;
    });
    builder.addCase(getBuildingById.fulfilled, (state, action) => {
      state.getBuildingById.loadingBuildingById = false;
      state.getBuildingById.currentBuilding = action.payload;
      state.getBuildingById.errorBuildingById = '';
    });
    builder.addCase(getBuildingById.rejected, (state, action) => {
      state.getBuildingById.loadingBuildingById = false;
      state.getBuildingById.errorBuildingById = action.payload as string;
    });
  }
});

export const { clearBuildings } = buildingsSlice.actions;

export default buildingsSlice.reducer;
