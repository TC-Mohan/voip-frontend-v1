// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { CallGETAPI, CallPOSTAPI } from "../helper/Constants";


// // New async thunk for balance check
// export const checkLowBalance = createAsyncThunk(
//   "wallet/checkLowBalance",
//   async (user_id, thunkAPI) => {
//     try {
//       const response = await CallPOSTAPI(`api/check-user-balance`, { user_id });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to check balance");
//     }
//   }
// );

// // Modify your fetchBalance thunk to include balance check
// export const fetchBalance = createAsyncThunk(
//   "wallet/fetchBalance",
//   async (_, thunkAPI) => {
//     try {
//       const response = await CallGETAPI(`api/get-user-info`);
      
//       // Get the user data
//       const userData = {
//         balance: response?.data?.data?.balance,
//         firstName: response?.data?.data?.first_name,
//         extension_number: response?.data?.combinedRecords?.id,
//         mobile_numbers_purchase: response?.data?.is_have_number?.length || 0,
//         userId: response?.data?.data?.user_id,
//         endDate: response?.data?.data?.endDate
//       };

//       // If balance is <= 10, trigger the balance check
//       if (parseFloat(userData.balance) <= 10) {
//         await thunkAPI.dispatch(checkLowBalance(userData.userId));
//       }

//       return userData;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch balance");
//     }
//   }
// );

// // export const fetchBalance = createAsyncThunk(
// //   "wallet/fetchBalance",
// //   async (thunkAPI) => {
// //     try {
// //       const response = await CallGETAPI(`api/get-user-info`);
// //       // console.log(response);
// //       return {
// //         balance: response?.data?.data?.balance,
// //         firstName: response?.data?.data?.first_name,
// //         extension_number: response?.data?.combinedRecords?.id,
// //         mobile_numbers_purchase: response?.data?.is_have_number?.length || 0,
// //         userId: response?.data?.data?.user_id, // Added userId
// //         endDate:response?.data?.data?.endDate
// //       };
// //     } catch (error) {
// //       return thunkAPI.rejectWithValue("Failed to fetch balance");
// //     }
// //   }
// // );

// export const fetchSipUserData = createAsyncThunk(
//   "sip/fetchSipUserData",
//   async (_, thunkAPI) => {
//     try {
//       const response = await CallGETAPI(`api/get-user-extension`);
//       return response.data.data.id;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to fetch SIP user data");
//     }
//   }
// );


// export const updateCallBalance = createAsyncThunk(
//   "wallet/updateCallBalance",
//   async ({ amount }, thunkAPI) => {
//     try {
//       const response = await CallPOSTAPI(`api/update-call-balance`, { amount });
//       return response.data.currentBalance;
//     } catch (error) {
//       return thunkAPI.rejectWithValue("Failed to update balance during call");
//     }
//   }
// );


// export const createPhoneNumber = createAsyncThunk(
//   "phoneNumber/createPhoneNumber",
//   async ({ number, price }, thunkAPI) => {
//     try {
//       const response = await CallPOSTAPI("api/create-purchase-number-v2", {
//         number,
//         price
//       });

//       return response.data;
//     } catch (error) {
//       if (error.message === "Insufficient balance") {
//         return thunkAPI.rejectWithValue(
//           "Insufficient balance. Please add funds to your wallet."
//         );
//       } else {
//         return thunkAPI.rejectWithValue("Failed to create phone number");
//       }
//     }
//   }
// );

// const walletSlice = createSlice({
//   name: "wallet",
//   initialState: {
//     balance: 0,
//     firstName: "",
//     extension_number: "",
//     connectionStatus: "disconnected",
//     liveCalls: {}, // Object to store live calls count by user_id
//     status: "idle",
//     userId: 0, // Added userId
//     endDate: "",
//     calls_data:{
//       loading: true,
//       campagin_calls: [],
//       ext_calls: [],
//       counts:0,
//     }
//   },
//   reducers: {
//     addMoney: (state, action) => {
//       state.balance = parseInt(state.balance) + parseInt(action.payload);
//     },
//     spendMoney: (state, action) => {
//       state.balance = parseInt(state.balance) - parseInt(action.payload);
//     },
//     updatedMoney: (state, action) => {
//       state.balance = action.payload;
//     },
    
//     updateConnectionStatus: (state, action) => {
//       state.connectionStatus = action.payload;
//     },
//     incrementLiveCalls: (state, action) => {
//       const userId = action.payload.userId;
//       if (!state.liveCalls[userId]) {
//         state.liveCalls[userId] = 0;
//       }
//       state.liveCalls[userId] += 1;
//     },
//    decrementLiveCalls: (state, action) => {
//       const userId = action.payload.userId;
//       if (state.liveCalls[userId]) {
//         state.liveCalls[userId] -= 1;
//         state.liveCalls[userId] = Math.max(state.liveCalls[userId], 0); // Ensure count doesn't go below 0
//       }
//     },

//     handleCallsData: (state,action)=>{
//       state.calls_data = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchBalance.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchBalance.fulfilled, (state, action) => {
//         state.balance = action.payload.balance;
//         state.firstName = action.payload.firstName;
//         state.extension_number = action.payload.extension_number;
//         state.userId = action.payload.userId;
//         state.endDate = action.payload.endDate;
//         state.status = "idle";
        
//       })
//       .addCase(fetchBalance.rejected, (state) => {
//         state.status = "failed";
//       })
//       .addCase(fetchSipUserData.fulfilled, (state, action) => {
//         state.extension_number = action.payload;
//       })
//       .addCase(updateCallBalance.fulfilled, (state, action) => {
//         state.balance = action.payload;
//       })
//       .addCase(createPhoneNumber.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(createPhoneNumber.fulfilled, (state, action) => {
//         state.status = "idle";
//         state.extension_number = action.payload.extension_number; // Update with the new extension number
//       })
//       .addCase(createPhoneNumber.rejected, (state, action) => {
//         state.status = "failed";
//       });
//   },
// });

// export const {
//   updatedMoney,
//   addMoney,
//   spendMoney,
//   updateConnectionStatus,
//   incrementLiveCalls,
//   decrementLiveCalls,
//   handleCallsData,
// } = walletSlice.actions;

// export default walletSlice.reducer;



// walletSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CallGETAPI, CallPOSTAPI } from "../helper/Constants";

// Thunk for checking balance in wallet page
export const fetchWalletBalance = createAsyncThunk(
  "wallet/fetchWalletBalance",
  async (_, thunkAPI) => {
    try {
      const response = await CallGETAPI(`api/get-user-info`);
      
      const userData = {
        balance: response?.data?.data?.balance,
        firstName: response?.data?.data?.first_name,
        extension_number: response?.data?.combinedRecords?.id,
        mobile_numbers_purchase: response?.data?.is_have_number?.length || 0,
        userId: response?.data?.data?.user_id,
        endDate: response?.data?.data?.endDate
      };

      // Check balance and send email only in wallet page
      if (parseFloat(userData.balance) <= 10) {
        await CallPOSTAPI(`api/check-user-balance`, { user_id: userData.userId });
      }

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch wallet balance");
    }
  }
);

// Regular balance check without email notification
export const fetchBalance = createAsyncThunk(
  "wallet/fetchBalance",
  async (_, thunkAPI) => {
    try {
      const response = await CallGETAPI(`api/get-user-info`);
      return {
        balance: response?.data?.data?.balance,
        firstName: response?.data?.data?.first_name,
        extension_number: response?.data?.combinedRecords?.id,
        mobile_numbers_purchase: response?.data?.is_have_number?.length || 0,
        userId: response?.data?.data?.user_id,
        endDate: response?.data?.data?.endDate
      };
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch balance");
    }
  }
);

// Other existing thunks
export const fetchSipUserData = createAsyncThunk(
  "sip/fetchSipUserData",
  async (_, thunkAPI) => {
    try {
      const response = await CallGETAPI(`api/get-user-extension`);
      return response.data.data.id;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch SIP user data");
    }
  }
);

export const updateCallBalance = createAsyncThunk(
  "wallet/updateCallBalance",
  async ({ amount }, thunkAPI) => {
    try {
      const response = await CallPOSTAPI(`api/update-call-balance`, { amount });
      return response.data.currentBalance;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update balance during call");
    }
  }
);

export const createPhoneNumber = createAsyncThunk(
  "phoneNumber/createPhoneNumber",
  async ({ number, price }, thunkAPI) => {
    try {
      const response = await CallPOSTAPI("api/create-purchase-number-v2", {
        number,
        price
      });
      return response.data;
    } catch (error) {
      if (error.message === "Insufficient balance") {
        return thunkAPI.rejectWithValue(
          "Insufficient balance. Please add funds to your wallet."
        );
      }
      return thunkAPI.rejectWithValue("Failed to create phone number");
    }
  }
);

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    balance: 0,
    liveCallsCount: 0,
    firstName: "",
    extension_number: "",
    connectionStatus: "disconnected",
    liveCalls: {},
    status: "idle",
    userId: 0,
    endDate: "",
    calls_data: {
      loading: true,
      campagin_calls: [],
      ext_calls: [],
      counts: 0,
    }
  },
  reducers: {
    updateLiveCallsCount: (state, action) => {
      state.liveCallsCount = action.payload;
    },
    addMoney: (state, action) => {
      state.balance = parseInt(state.balance) + parseInt(action.payload);
    },
    spendMoney: (state, action) => {
      state.balance = parseInt(state.balance) - parseInt(action.payload);
    },
    updatedMoney: (state, action) => {
      state.balance = action.payload;
    },
    updateConnectionStatus: (state, action) => {
      state.connectionStatus = action.payload;
    },
    incrementLiveCalls: (state, action) => {
      const userId = action.payload.userId;
      if (!state.liveCalls[userId]) {
        state.liveCalls[userId] = 0;
      }
      state.liveCalls[userId] += 1;
    },
    decrementLiveCalls: (state, action) => {
      const userId = action.payload.userId;
      if (state.liveCalls[userId]) {
        state.liveCalls[userId] -= 1;
        state.liveCalls[userId] = Math.max(state.liveCalls[userId], 0);
      }
    },
    handleCallsData: (state, action) => {
      state.calls_data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Regular fetchBalance cases
      .addCase(fetchBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.firstName = action.payload.firstName;
        state.extension_number = action.payload.extension_number;
        state.userId = action.payload.userId;
        state.endDate = action.payload.endDate;
        state.status = "idle";
      })
      .addCase(fetchBalance.rejected, (state) => {
        state.status = "failed";
      })
      // Wallet specific balance check cases
      .addCase(fetchWalletBalance.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWalletBalance.fulfilled, (state, action) => {
        state.balance = action.payload.balance;
        state.firstName = action.payload.firstName;
        state.extension_number = action.payload.extension_number;
        state.userId = action.payload.userId;
        state.endDate = action.payload.endDate;
        state.status = "idle";
      })
      .addCase(fetchWalletBalance.rejected, (state) => {
        state.status = "failed";
      })
      // Other existing cases
      .addCase(fetchSipUserData.fulfilled, (state, action) => {
        state.extension_number = action.payload;
      })
      .addCase(updateCallBalance.fulfilled, (state, action) => {
        state.balance = action.payload;
      })
      .addCase(createPhoneNumber.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPhoneNumber.fulfilled, (state, action) => {
        state.status = "idle";
        state.extension_number = action.payload.extension_number;
      })
      .addCase(createPhoneNumber.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const {
  updatedMoney,
  addMoney,
  spendMoney,
  updateConnectionStatus,
  incrementLiveCalls,
  decrementLiveCalls,
  handleCallsData,
  updateLiveCallsCount 
} = walletSlice.actions;

export default walletSlice.reducer;