import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setItems, setQueryParams } from "../redux/slices/booksSlice";
import { RootState, useAppDispatch } from "../redux/store";
import FilterSort from "./FilterSort";

const Header: React.FC = () => {
    let [queryText, setQueryText] = useState("");
    let [queryTextError, setQueryTextError] = useState(false);

    let queryInput = useRef<HTMLInputElement>(null);
    let category = useRef<HTMLSelectElement>(null);
    let sort = useRef<HTMLSelectElement>(null);

    let loadingStatus = useSelector((state: RootState) => state.books.loadingStatus);

    let dispatch = useDispatch();
    let appDispatch = useAppDispatch();

    function loadBooks() {
        if (!queryText && queryInput.current) {
            queryInput.current.focus();
            setQueryTextError(true);

            return;
        }

        if (category.current && sort.current && loadingStatus !== "loading") {
            dispatch(
                setQueryParams({
                    queryText,
                    currentCategory: category.current.value,
                    currentSort: sort.current.value,
                })
            );
            dispatch(setItems([]));

            appDispatch(
                fetchBooks({
                    queryText,
                    loadedCount: 0,
                    category: category.current.value,
                    sort: sort.current.value,
                })
            );
        }
    }

    return (
        <div className="header">
            <div className="header_search">
                <input
                    type="search"
                    value={queryText}
                    placeholder="Harry Potter"
                    className={queryTextError ? "error" : ""}
                    ref={queryInput}
                    onChange={(event) => {
                        setQueryText(event.target.value);
                        setQueryTextError(false);
                    }}
                    onKeyDown={(event) => {
                        if (event.code === "Enter" || event.code === "NumpadEnter") loadBooks();
                    }}
                />
                <button onClick={() => loadBooks()}>
                    <svg width="29" height="29" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" />
                    </svg>
                </button>
            </div>
            <FilterSort category={category} sort={sort} />
        </div>
    );
};

export default Header;
