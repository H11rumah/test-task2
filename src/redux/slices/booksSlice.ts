import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type BookItem = {
    id: string;
    etag: string;
    volumeInfo: {
        title: string;
        authors: string[];
        categories: string[];
        description: string;
        imageLinks: {
            thumbnail: string;
        };
    };
};

type BooksState = {
    items: BookItem[];
    totalCount: number;
    loadingStatus: string;
    error: string;
    queryParams: {
        queryText: string;
        currentCategory: string;
        currentSort: string;
    };
};

type FetchBooksParams = {
    queryText: string;
    loadedCount: number;
    category: string;
    sort: string;
};

export let fetchBooks = createAsyncThunk("books/fetchBooksStatus", async (params: FetchBooksParams) => {
    let { queryText, loadedCount, category, sort } = params;

    let url = new URL(`https://www.googleapis.com/books/v1/volumes`);

    if (category !== "all") {
        url.searchParams.append("q", `${queryText}+subject:${category}`);
    } else {
        url.searchParams.append("q", queryText);
    }

    url.searchParams.append("key", "AIzaSyDL-IqaQL_C_OnWHnyHeBedVzCTKqDgtms");
    url.searchParams.append("orderBy", sort);
    url.searchParams.append("startIndex", `${loadedCount === 0 ? loadedCount : loadedCount + 30}`);
    url.searchParams.append("maxResults", "30");

    let resp = await fetch(url);
    let result = await resp.json();

    console.log(result);

    return { ...result, loadedCount };
});

const initialState: BooksState = {
    items: [],
    totalCount: 0,
    loadingStatus: "idle",
    error: "",
    queryParams: {
        queryText: "",
        currentCategory: "",
        currentSort: "",
    },
};

export const booksSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        setItems: (state, action) => {
            state.items = action.payload;
        },

        setQueryParams: (state, action) => {
            state.queryParams = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = "";
            })

            .addCase(fetchBooks.fulfilled, (state, action) => {
                if (action.payload.loadedCount > 0) {
                    state.items = state.items.concat(action.payload.items || []);
                } else {
                    state.items = action.payload.items || [];
                    state.totalCount = action.payload.totalItems;
                }

                state.loadingStatus = "idle";
                state.error = "";
            })

            .addCase(fetchBooks.rejected, (state, action) => {
                state.items = [];
                state.loadingStatus = "failed";
                state.error = "Error";
            });
    },
});

export const { setItems, setQueryParams } = booksSlice.actions;

export default booksSlice.reducer;
