import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://drink-master-project-zi2s.onrender.com',
});

export const setToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const signInThunk = createAsyncThunk(
  'auth/signin',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/auth/signin', formData);
      console.log('data:', data);
      setToken(data.token);
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

export const signUpThunk = createAsyncThunk(
  'auth/signup',
  async (formData, thunkApi) => {
    try {
      const { data } = await instance.post('/auth/signup', formData);
      console.log('data:', data);
      setToken(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshThunk = createAsyncThunk(
  'auth/refresh',
  async (_, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.auth.token;
      setToken(token);
      const { data } = await instance.get('/users/current');

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  },
  {
    condition: (_, thunkApi) => {
      const state = thunkApi.getState();
      const token = state.auth.token;
      if (!token) return false;
      return true;
    },
  }
);

export const logOutThunk = createAsyncThunk(
  'auth/signout',
  async (_, thunkApi) => {
    try {
      const { data } = await instance.post('/auth/signout');

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);

// export const updateAvatarThunk = createAsyncThunk(
//   'auth/updateAvatarThunk',
//   async (file, thunkApi) => {
//     try {
//       const formData = new FormData();
//       formData.append('avatar', file);
//       const { data } = await instance.post('/users/avatar', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });

//       return data.avatar;
//     } catch (err) {
//       return thunkApi.rejectWithValue(err.message);
//     }
//   }
// );
export const updateAvatarThunk = createAsyncThunk(
  'users/avatar',
  async ({ file, name }, thunkApi) => {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('name', name);
      const { data } = await instance.patch('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      return data.avatar;
    } catch (err) {
      return thunkApi.rejectWithValue(err.message);
    }
  }
);
