/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'
import { UserDocument } from '../../../../typesDefs/constants/app/users/users.types';
import { jwtDecode } from 'jwt-decode';

interface InitialStateProps extends UserDocument {
  loading: boolean,
  success: boolean,
  error: null | any,
  signedOut?: boolean,
}

const initialState: InitialStateProps = {
  _id: '',
  name: '',
  email: '',
  description: '',
  image: '',
  permissions: 'common',
  phone: '',
  loading: false,
  success: false,
  error: null,
  signedOut: false
};

export const userLoginFunction = createAsyncThunk(
  'users/userLoginFunction',
  async (params: { email: string; password: string; context: any }, thunkApi: { rejectWithValue: any }) => {
    try {
      const query = await params.context.authUser(params.email, params.password);
      const response = await query.json();
      
      if (query.status > 202) {
        return thunkApi.rejectWithValue(response?.message);
      }
      
      const decodedJwt = await jwtDecode(response?.token)
      
      Cookies.set("accessToken", response?.token);
      
      return decodedJwt;
    } catch (error: any) {
      return thunkApi.rejectWithValue(error?.message);
    }
  }
);

export const userLogoutFunction = createAsyncThunk(
  'users/userLogoutFunction',
  async () => {    
    Cookies.remove("auth");
    Cookies.remove("accessToken");

    return true
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearStateUser: (state) => {
      state._id = initialState._id;
      state.name = initialState.name;
      state.email = initialState.email;
      state.description = initialState.description;
      state.image = initialState.image;
      state.permissions = initialState.permissions;
      state.phone = initialState._id;
      state.loading = false;
      state.error = null;
      state.signedOut = false;
    },
    setUserDataFromToken: (state, action) => {
      const { payload }: { payload: UserDocument } = action;
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
      state.description = payload.description;
      state.image = payload.image;
      state.permissions = payload.permissions;
      state.phone = payload._id;
      state.loading = false;
      state.success = true;
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(userLoginFunction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userLoginFunction.fulfilled, (state, action) => {
      const { payload }: { payload: UserDocument } = action;
      state._id = payload._id;
      state.name = payload.name;
      state.email = payload.email;
      state.description = payload.description;
      state.image = payload.image;
      state.permissions = payload.permissions;
      state.phone = payload._id;
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(userLoginFunction.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.error;
    });

    builder.addCase(userLogoutFunction.fulfilled, (state) => {
      state.signedOut = true;
    });
  }
});


export const { clearStateUser,setUserDataFromToken } = userSlice.actions;

export default userSlice.reducer;
