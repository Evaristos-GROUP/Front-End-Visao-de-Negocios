import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userStates } from "../types/States";
import UserSE from "../services/UserSE";
import { userDispatch, UsersList } from "../types/models/userMO";
import { sanitizeString } from "../utils/normalizer";

const initialState: userStates = {
  user: null,
  userList: [],
  error_user: false,
  success_user: false,
  loading_user: false,
};

export const addNewUser = createAsyncThunk(
  "user/NewUser",
  async (user: userDispatch, thunkAPI) => {
    const sanitizedUser = {
      ...user,
      funcao: sanitizeString(user.funcao),
    };

    const data = await UserSE.newUser(sanitizedUser);
    if (data.http_status_code === 400 || data.http_status_code === 500) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    const data = await UserSE.getAllUsers();
    if (data.http_status_code === 400 || data.http_status_code === 500) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data);
    }
  }
);

export const inactiveAUser = createAsyncThunk(
  "user/inactiveAUser",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(deleteUserList({ id: id }));

    const data = await UserSE.inactiveAUser(id);
    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const updateAUser = createAsyncThunk(
  "user/updateAUser",
  async (
    newUser: { id: string; nome: string; email: string; funcao: string },
    thunkAPI
  ) => {
    thunkAPI.dispatch(updateUSerList({ newUser: newUser }));

    const data = await UserSE.updateUser(newUser);
    console.log(typeof data.http_status_code);

    if (data.http_status_code !== 200) {
      return thunkAPI.rejectWithValue(data.message);
    } else if (data.http_status_code === 200) {
      thunkAPI.dispatch(updateUSerList(newUser));
      return thunkAPI.fulfillWithValue(data.message);
    }
  }
);

export const UserSL = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserList: (state, action) => {
      if (action.payload && action.payload.user) {
        state.userList.push({ ...action.payload.user, isActive: true });
      } else {
        console.error("Erro: Payload do usuário está indefinido.");
      }
    },

    updateUSerList: (state, action) => {
      const { newUser } = action.payload;
      const userIndex = state.userList.findIndex(
        (user) => user.id === newUser.id
      );

      if (userIndex !== -1) {
        state.userList[userIndex] = {
          ...state.userList[userIndex],
          email: newUser.email,
          funcao: newUser.funcao,
          nome: newUser.nome,
        };
      } else {
        console.error(
          "Erro: Não foi possível atualizar o usuário. Índice inválido."
        );
      }
    },

    deleteUserList: (state, action) => {
      const { id } = action.payload;
      const user = state.userList.find((user) => user.id === id);

      if (user) {
        user.isActive = !user.isActive;
      } else {
        console.error("Erro: Não foi possível inativar o usuário.");
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addNewUser.pending, (state) => {
        state.error_user = false;
        state.loading_user = true;
        state.success_user = false;
      })
      .addCase(addNewUser.fulfilled, (state, action) => {
        state.error_user = false;
        state.success_user = action.payload as string;
        state.loading_user = false;
      })
      .addCase(addNewUser.rejected, (state, action) => {
        state.error_user = action.payload as string;
        state.success_user = false;
        state.loading_user = false;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.error_user = false;
        state.success_user = action.payload!.message;
        state.loading_user = false;
        state.userList = (action.payload!.data as unknown[])[0] as UsersList[];
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error_user = action.payload as string;
        state.success_user = false;
        state.loading_user = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.error_user = false;
        state.success_user = false;
        state.loading_user = true;
      })
      .addCase(inactiveAUser.pending, (state) => {
        state.loading_user = true;
      })
      .addCase(inactiveAUser.fulfilled, (state, action) => {
        state.loading_user = false;
        state.success_user = action.payload as string;
      })
      .addCase(inactiveAUser.rejected, (state, action) => {
        state.loading_user = false;
        state.error_user = action.payload as string;
      })
      .addCase(updateAUser.pending, (state) => {
        state.loading_user = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        state.loading_user = false;
        state.success_user = action.payload as string;
      })
      .addCase(updateAUser.rejected, (state, action) => {
        state.loading_user = false;
        state.error_user = action.payload as string;
      });
  },
});

export const { updateUSerList, deleteUserList, addUserList } = UserSL.actions;
export default UserSL.reducer;
