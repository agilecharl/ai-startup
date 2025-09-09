import { createSlice } from '@reduxjs/toolkit';

export interface SettingsState {
    refresh: boolean;
    categories: string[];
    codes: string[];
    systemState: [];
    server: string;
    postgresDatabase: string;
    mongoDatabase: string;
    mongoCollection: string;
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        refresh: false,
        systemState: [{ currentTab: 1 }],
        categories: [],
        codes: [],
        server: 'localhost',
        postgresDatabase: 'central',
        mongoDatabase: 'central',
        mongoCollection: 'central',
    },
    reducers: {
        setPostgresDatabase: (state, action) => {
            state.postgresDatabase = action.payload;
        },
        setMongoDatabase: (state, action) => {
            state.mongoDatabase = action.payload;
        },
        setMongoCollection: (state, action) => {
            state.mongoCollection = action.payload;
        },
        refreshRecords: (state, action) => {
            state.refresh = action.payload;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
        setCodes: (state, action) => {
            state.codes = action.payload;
        },
        setConnectionDetails: (state, action) => {
            const { server, postgresDatabase, mongoDatabase, mongoCollection } = action.payload;
            state.server = server;
            state.postgresDatabase = postgresDatabase;
            state.mongoDatabase = mongoDatabase || 'central';
            state.mongoCollection = mongoCollection || 'central';
        },
    },
});

export const {
    setCategories,
    setConnectionDetails,
    setPostgresDatabase,
    setMongoDatabase,
    setMongoCollection,
    refreshRecords,
    setCodes,
} = settingsSlice.actions;

export default settingsSlice.reducer;
