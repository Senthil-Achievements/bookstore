import React from 'react';
import { useSearchParams } from 'react-router-dom';
import BookCard from '../books/BookCard';
import { useFetchAllBooksQuery } from '../../redux/features/books/booksApi';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

    const filteredBooks = books.filter(book => 
        book?.title?.toLowerCase().includes(query.toLowerCase()) || 
        book?.description?.toLowerCase().includes(query.toLowerCase())
    );

    if (isLoading) return <div className="py-10 text-center text-lg">Loading search results...</div>;
    if (isError) return <div className="py-10 text-center text-lg text-red-500">Error fetching books.</div>;

    return (
        <div className="py-10 container mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-6">Search Results for "{query}"</h2>
            {filteredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-500">No books found matching your search.</p>
            )}
        </div>
    );
};

export default SearchPage;
