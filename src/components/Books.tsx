import React, { useEffect, useRef } from "react";
import BookList from "./BookList";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { fetchBooks } from "../redux/slices/booksSlice";
import BookListItemSkeleton from "./BookListItemSkeleton";

const Books: React.FC = () => {
    let books = useSelector((state: RootState) => state.books.items);
    let totalCount = useSelector((state: RootState) => state.books.totalCount);
    let loadingStatus = useSelector((state: RootState) => state.books.loadingStatus);
    let queryParams = useSelector((state: RootState) => state.books.queryParams);

    let loadedFirstTime = useRef(false);

    let appDispatch = useAppDispatch();

    function loadMore() {
        appDispatch(
            fetchBooks({
                queryText: queryParams.queryText,
                loadedCount: books.length,
                category: queryParams.currentCategory,
                sort: queryParams.currentSort,
            })
        );
    }

    useEffect(() => {
        if (loadingStatus === "loading") loadedFirstTime.current = true;
    }, [loadingStatus]);

    return (
        <div className="books">
            {loadingStatus === "failed" || books.length || loadedFirstTime.current ? (
                <span className="books_count">
                    {loadingStatus !== "failed" ? `Found ${totalCount} books` : "Failed to get the books"}
                </span>
            ) : (
                <></>
            )}
            <BookList />
            <div className="books_load_placeholder">
                {loadingStatus === "loading" ? (
                    new Array(6).fill("").map((elem, id) => {
                        return <BookListItemSkeleton key={id} />;
                    })
                ) : (
                    <></>
                )}
            </div>
            {books.length < totalCount && loadingStatus !== "failed" ? (
                <button className="books_load_more" onClick={() => loadMore()}>
                    Load more
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Books;
