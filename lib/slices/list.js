import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    data: {},
    keys: [],
    length: 0
};

const listSlice = createSlice({
  
    name: 'list',
    initialState,
    reducers: {
  
      addItem: (state, action) => {

        const { key, data } = action.payload;

        if (!state.data[key]) {
            state.data[key] = [];
            state.keys.push(key);
            state.length++;
        }

        state.data[key].push(data);

      },

      updateItem: (state, action) => {

        const { key, index, data } = action.payload;

        if (state.data[key] && state.data[key][index]) {
          state.data[key][index] = data;
        }

      },

      deleteItem: (state, action) => {

        const { key, index } = action.payload;

        if (state.data[key] && state.data[key][index]) {
          state.data[key].splice(index, 1);
          state.length--;
        }

      },

      getItem: (state, action) => {

        const { key, index } = action.payload;

        if (state.data[key] && state.data[key][index]) {
            return state.data[key][index];
        }

      },

      getList: (state, action) => {

        const { key } = action.payload;

        if (state.data[key]) {
            return state.data[key];
        }

      },

      getTree: (state, action) => {

        return state.data;

      }
  
    },
  
});

export const { addItem, updateItem, deleteItem, getItem, getList, getTree } = listSlice.actions;
export default listSlice.reducer;