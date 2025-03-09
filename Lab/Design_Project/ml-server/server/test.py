from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

class Book(BaseModel):
    book_id: int
    title: str
    author: str
    description: Optional[str] = None

app = FastAPI()

BOOKS = [
    Book(book_id=1, title="The Great Gatsby 2", author="F. Scott Fitzgerald"),
    Book(book_id=2, title="To Kill a Mockingbird", author="Harper Lee"),
    Book(book_id=3, title="1984", author="George Orwell"),
    Book(book_id=4, title="Pride and Prejudice", author="Jane Austen"),
    Book(book_id=5, title="The Catcher in the Rye", author="J.D. Salinger"),
    Book(book_id=6, title="The Hobbit", author="J.R.R. Tolkien"),
    Book(book_id=7, title="Fahrenheit 451", author="Ray Bradbury"),
    Book(book_id=8, title="The Lord of the Rings", author="J.R.R. Tolkien"),
    Book(book_id=9, title="Animal Farm", author="George Orwell"),
    Book(book_id=10, title="Brave New World", author="Aldous Huxley")
]

@app.get("/api/books")
async def get_all_books():
    return {"books": BOOKS}

@app.post("/api/books", response_model=dict)
async def add_book(book: Book):
    if any(existing_book.book_id == book.book_id for existing_book in BOOKS):
        raise HTTPException(
            status_code=400,
            detail="Book with this ID already exists"
        )
    
    BOOKS.append(book)
    
    return {
        "book": book,
        "message": "Book added successfully"
    }