
import { configureStore } from '@reduxjs/toolkit'
import UserReducer from 'store/User'

export default configureStore( {
  reducer: {
    user: UserReducer,
  },
} );
