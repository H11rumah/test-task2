import React from "react";

type FilterSortProps = {
    category: React.RefObject<HTMLSelectElement>;
    sort: React.RefObject<HTMLSelectElement>;
};

const FilterSort: React.FC<FilterSortProps> = ({ category, sort }) => {
    let categoryFields = [
        ["all", "All"],
        ["art", "Art"],
        ["biography", "Biography"],
        ["computers", "Computers"],
        ["history", "History"],
        ["medical", "Medical"],
        ["poetry", "Poetry"],
    ];

    let sortFields = [
        ["relevance", "Relevance"],
        ["newest", "Newest"],
    ];

    return (
        <div className="header_filterSort">
            <div>
                <label htmlFor="categories">Categories</label>
                <select name="categories" id="categories" defaultValue={"all"} ref={category}>
                    {categoryFields.map((elem) => {
                        return <option value={elem[0]}>{elem[1]}</option>;
                    })}
                </select>
            </div>
            <div>
                <label htmlFor="sort">Sort by</label>
                <select name="sort" defaultValue={"relevance"} ref={sort}>
                    {sortFields.map((elem) => {
                        return <option value={elem[0]}>{elem[1]}</option>;
                    })}
                </select>
            </div>
        </div>
    );
};

export default FilterSort;
