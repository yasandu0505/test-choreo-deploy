import { useEffect, useState } from "react"

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/"

    const fetchMinistries = async () => {
      try {
        const response = await fetch(`${apiUrl}/books`)

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`)
        }

        const data = await response.json()
        setBooks(data)
      } catch (err) {
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchMinistries()
  }, [])

  // Loading Spinner Component
  const LoadingSpinner = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "400px",
        gap: "20px",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          border: "4px solid #f3f3f3",
          borderTop: "4px solid #3498db",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <p
        style={{
          fontSize: "18px",
          color: "#666",
          fontWeight: "500",
          margin: 0,
        }}
      >
        Loading books...
      </p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )

  // Error Component
  const ErrorDisplay = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        backgroundColor: "#fff5f5",
        border: "2px solid #fed7d7",
        borderRadius: "12px",
        padding: "40px",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          fontSize: "48px",
          marginBottom: "16px",
        }}
      >
        📚❌
      </div>
      <h3
        style={{
          color: "#e53e3e",
          fontSize: "24px",
          fontWeight: "600",
          margin: "0 0 12px 0",
        }}
      >
        Oops! Something went wrong
      </h3>
      <p
        style={{
          color: "#c53030",
          fontSize: "16px",
          textAlign: "center",
          margin: 0,
          maxWidth: "400px",
        }}
      >
        {error}
      </p>
    </div>
  )

  // Empty State Component
  const EmptyState = () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
        backgroundColor: "#f7fafc",
        border: "2px dashed #cbd5e0",
        borderRadius: "12px",
        padding: "40px",
        margin: "20px 0",
      }}
    >
      <div
        style={{
          fontSize: "64px",
          marginBottom: "16px",
          opacity: "0.6",
        }}
      >
        📖
      </div>
      <h3
        style={{
          color: "#4a5568",
          fontSize: "24px",
          fontWeight: "600",
          margin: "0 0 12px 0",
        }}
      >
        No books found
      </h3>
      <p
        style={{
          color: "#718096",
          fontSize: "16px",
          textAlign: "center",
          margin: 0,
        }}
      >
        {"We couldn't find any books in our collection right now."}
      </p>
    </div>
  )

  // Book Card Component
  const BookCard = ({ book, index }) => (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        margin: "16px 0",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)",
        border: "1px solid #e2e8f0",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)"
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)"
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)"
        e.currentTarget.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.07), 0 1px 3px rgba(0, 0, 0, 0.06)"
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "4px",
          height: "100%",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "22px",
            fontWeight: "700",
            color: "#2d3748",
            margin: 0,
            lineHeight: "1.3",
            flex: 1,
          }}
        >
          {book.title}
        </h3>

        <div
          style={{
            backgroundColor: "#edf2f7",
            color: "#4a5568",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600",
            textTransform: "uppercase",
            letterSpacing: "0.5px",
            marginLeft: "16px",
            whiteSpace: "nowrap",
          }}
        >
          {book.genre}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "16px" }}>👤</span>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#718096",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Author ID
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#4a5568",
                fontWeight: "600",
              }}
            >
              {book.authorId}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "16px" }}>📄</span>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#718096",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Pages
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#4a5568",
                fontWeight: "600",
              }}
            >
              {book.pages}
            </div>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span style={{ fontSize: "16px" }}>💰</span>
          <div>
            <div
              style={{
                fontSize: "12px",
                color: "#718096",
                fontWeight: "500",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
              }}
            >
              Price
            </div>
            <div
              style={{
                fontSize: "18px",
                color: "#38a169",
                fontWeight: "700",
              }}
            >
              ${book.price}
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          paddingTop: "16px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <span style={{ fontSize: "16px" }}>📅</span>
        <div>
          <span
            style={{
              fontSize: "12px",
              color: "#718096",
              fontWeight: "500",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Published:{" "}
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#4a5568",
              fontWeight: "600",
            }}
          >
            {new Date(book.publicationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        fontFamily: '"Inter", "Segoe UI", "Roboto", sans-serif',
        padding: "0",
      }}
    >
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "40px 20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              margin: "0 0 16px 0",
              letterSpacing: "-1px",
            }}
          >
            📚 Book Collection
          </h1>
          <p
            style={{
              fontSize: "18px",
              color: "#718096",
              margin: 0,
              fontWeight: "500",
            }}
          >
            Discover amazing books in our curated collection
          </p>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}
        {error && <ErrorDisplay />}
        {!loading && !error && books.length === 0 && <EmptyState />}
        {!loading && !error && books.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "32px",
                padding: "0 4px",
              }}
            >
              <h2
                style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#2d3748",
                  margin: 0,
                }}
              >
                Available Books
              </h2>
              <div
                style={{
                  backgroundColor: "#667eea",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "24px",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                {books.length} {books.length === 1 ? "Book" : "Books"}
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
                gap: "24px",
              }}
            >
              {books.map((book, index) => (
                <BookCard key={book.bookId} book={book} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
