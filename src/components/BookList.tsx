import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import BookListItem from "./BookListItem";
import bookPlaceholder from "../assets/bookPlaceholder.png";
import BookListItemModal from "./BookListItemModal";

const BookList: React.FC = () => {
    let [showBookModal, setShowBookModal] = useState(false);
    let [bookModalData, setBookModalData] = useState({
        imgUrl: "",
        title: "",
        authors: [""],
        categories: [""],
        description: "",
    });

    let books = useSelector((state: RootState) => state.books.items);

    return (
        <div className="books_list">
            {showBookModal ? <BookListItemModal {...bookModalData} setShowBookModal={setShowBookModal} /> : <></>}
            {books.map((elem) => {
                return (
                    <BookListItem
                        imgUrl={elem.volumeInfo.imageLinks?.thumbnail || bookPlaceholder}
                        title={elem.volumeInfo.title}
                        authors={elem.volumeInfo.authors}
                        categories={elem.volumeInfo.categories}
                        description={elem.volumeInfo.description}
                        key={elem.etag}
                        setShowBookModal={setShowBookModal}
                        setBookModalData={setBookModalData}
                    />
                );
            })}
        </div>
    );
};

export default BookList;
