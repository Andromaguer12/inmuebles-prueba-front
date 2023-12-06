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
  createBuilding: {
    loadingCreateBuilding: boolean,
    successCreateBuilding: boolean,
    errorCreateBuilding: null | any,
  },
  updateBuildingById: {
    loadingUpdateBuilding: boolean,
    successUpdateBuilding: boolean,
    errorUpdateBuilding: null | any,
  },
  deleteBuildingById: {
    loadingDeleteBuilding: boolean,
    successDeleteBuilding: boolean,
    errorDeleteBuilding: null | any,
  }
};


const initialState: initialStateType = {
  getBuildings: {
    loadingBuildings: false,
    dataBuildings: [],
    pageInfoBuildings: null,
    errorBuildings: null,
  },
  getBuildingById: {
    loadingBuildingById: false,
    currentBuilding: null,
    errorBuildingById: null,
  },
  createBuilding: {
    loadingCreateBuilding: false,
    successCreateBuilding: false,
    errorCreateBuilding: null,
  },
  updateBuildingById: {
    loadingUpdateBuilding: false,
    successUpdateBuilding: false,
    errorUpdateBuilding: null,
  },
  deleteBuildingById: {
    loadingDeleteBuilding: false,
    successDeleteBuilding: false,
    errorDeleteBuilding: null,
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
  'home/getBuildingById',
  async (params: { context: any; buildingId: string }, { rejectWithValue }) => {
    const query = await params.context.getBuildingById(params.buildingId);
    const response = await query.json();
    if (query.status > 202) {
      return rejectWithValue(response?.message);
    }
    return response;
  }
);

export const createBuilding = createAsyncThunk(
  'buildings/createBuilding',
  async (params: any, { rejectWithValue }) => {
    const response = await params.context.createBuilding(params.body);
    const data = await response.json();
    if (response.status > 202) {
      return rejectWithValue(data?.message);
    }
    return data;
  }
);

export const updateBuildingById = createAsyncThunk(
  'buildings/updateBuildingById',
  async (params: any, { rejectWithValue }) => {
    const response = await params.context.updateBuildingById(params.projectId, params.body);
    const data = await response.json();
    if (response.status > 202) {
      return rejectWithValue(data?.message);
    }
    return data;
  }
);

export const deleteBuildingById = createAsyncThunk(
  'buildings/deleteBuildingById',
  async (params: any, { rejectWithValue }) => {
    const response = await params.context.deleteBuildingById(params.projectId);
    if (response.status > 202) {
      return rejectWithValue('Error al eliminar el edificio');
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
      const { projects, ...rest } = action.payload;

      state.getBuildings.loadingBuildings = false;
      state.getBuildings.dataBuildings = projects;
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

    // Casos para createBuilding
    builder.addCase(createBuilding.pending, (state) => {
      state.createBuilding.loadingCreateBuilding = true;
    });
    builder.addCase(createBuilding.fulfilled, (state, action) => {
      state.createBuilding.loadingCreateBuilding = false;
      state.createBuilding.successCreateBuilding = action.payload;
      state.createBuilding.errorCreateBuilding = '';
    });
    builder.addCase(createBuilding.rejected, (state, action) => {
      state.createBuilding.loadingCreateBuilding = false;
      state.createBuilding.errorCreateBuilding = action.payload as string;
    });

    // Casos para updateBuildingById
    builder.addCase(updateBuildingById.pending, (state) => {
      state.updateBuildingById.loadingUpdateBuilding = true;
    });
    builder.addCase(updateBuildingById.fulfilled, (state, action) => {
      state.updateBuildingById.loadingUpdateBuilding = false;
      state.updateBuildingById.successUpdateBuilding = action.payload;
      state.updateBuildingById.errorUpdateBuilding = '';
    });
    builder.addCase(updateBuildingById.rejected, (state, action) => {
      state.updateBuildingById.loadingUpdateBuilding = false;
      state.updateBuildingById.errorUpdateBuilding = action.payload as string;
    });

    // Casos para deleteBuildingById
    builder.addCase(deleteBuildingById.pending, (state) => {
      state.deleteBuildingById.loadingDeleteBuilding = true;
    });
    builder.addCase(deleteBuildingById.fulfilled, (state, action) => {
      state.deleteBuildingById.loadingDeleteBuilding = false;
      state.deleteBuildingById.successDeleteBuilding = action.payload;
      state.deleteBuildingById.errorDeleteBuilding = '';
    });
    builder.addCase(deleteBuildingById.rejected, (state, action) => {
      state.deleteBuildingById.loadingDeleteBuilding = false;
      state.deleteBuildingById.errorDeleteBuilding = action.payload as string;
    });
  }
});

export const { clearBuildings } = buildingsSlice.actions;

export default buildingsSlice.reducer;
