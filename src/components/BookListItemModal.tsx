import React from "react";

export type BookListItemModalProps = {
    imgUrl: string;
    title: string;
    authors: string[];
    categories: string[];
    description: string;
    setShowBookModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookListItemModal: React.FC<BookListItemModalProps> = ({
    imgUrl,
    title,
    authors,
    categories,
    description,
    setShowBookModal,
}) => {
    return (
        <div className="books_list_modal">
            <div className="books_list_modal_content">
                <img src={imgUrl} alt="books cover" />
                <div className="books_list_modal_content_info">
                    <span className="books_list_modal_content_info_categories">
                        {categories ? categories.join(", ") : ""}
                    </span>
                    <span className="books_list_modal_content_info_title">{title}</span>
                    <span className="books_list_modal_content_info_authors">{authors ? authors.join(", ") : ""}</span>
                    <span className="books_list_modal_content_info_description">{description}</span>
                </div>
                <button className="books_list_modal_content_close" onClick={() => setShowBookModal(false)}>
                    <svg height="20px" viewBox="0 0 512 512" width="20px" xmlns="http://www.w3.org/2000/svg">
                        <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BookListItemModal;
