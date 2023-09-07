import React, { useState } from "react";
import { BookListItemModalProps } from "./BookListItemModal";

type BookListItemProps = {
    imgUrl: string;
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    setShowBookModal: React.Dispatch<React.SetStateAction<boolean>>;
    setBookModalData: React.Dispatch<
        React.SetStateAction<{
            imgUrl: string;
            title: string;
            authors: string[];
            categories: string[];
            description: string;
        }>
    >;
};

const BookListItem: React.FC<BookListItemProps> = ({
    imgUrl,
    title,
    authors,
    categories,
    description,
    setShowBookModal,
    setBookModalData,
}) => {
    return (
        <div
            className="books_list_item"
            onClick={() => {
                setShowBookModal(true);
                setBookModalData({ imgUrl, title, authors, categories, description });
            }}
        >
            <img src={imgUrl} alt="book cover" className="books_list_item_img" />
            <span className="books_list_item_category">{categories ? categories[0] : ""}</span>
            <span className="books_list_item_title">{title}</span>
            <span className="books_list_item_authors">{authors ? authors.join(", ") : ""}</span>
        </div>
    );
};

export default BookListItem;
