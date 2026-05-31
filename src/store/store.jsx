
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { streamApi } from "@/services/streamApi";


const store = configureStore({

    reducer: {
        [streamApi.reducerPath]: streamApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(streamApi.middleware),
});

setupListeners(store.dispatch);

export default store;