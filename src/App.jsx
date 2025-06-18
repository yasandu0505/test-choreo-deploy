import { useEffect, useState } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

    const fetchMinistries = async () => {
      try {
        const response = await fetch(`${apiUrl}/books`);

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        setBooks(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMinistries();
  }, []);

  return (
    <div style={{ padding: "1rem", fontFamily: "Arial, sans-serif" }}>
      {loading && <p>Loading books...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!loading && !error && books.length === 0 && <p>No books found.</p>}
      {!loading && !error && books.length > 0 && (
        <div>
          <h2>Available Books</h2>
          <ul>
            {books.map((book) => (
              <li key={book.bookId}>
                <strong>{book.title}</strong> by Author ID: {book.authorId}<br />
                Genre: {book.genre} | Pages: {book.pages} | Price: ${book.price}<br />
                Published on: {book.publicationDate}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
