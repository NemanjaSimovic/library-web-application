using Library_api.Data;
using Library_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library_api.Services
{
    public class BookService
    {
        private readonly DataContext _context;
        public BookService(DataContext context)
        {
            _context = context;
        }

        //Helping methods:
        public async Task<int> CountReservationsForBookId(int bookId)
        {
            int reservationsCounter = 0;
            List<Reservation> allReservations = await _context.Reservation.ToListAsync();
            foreach (Reservation reservation in allReservations)
            {
                if (reservation.BookId == bookId)
                {
                    reservationsCounter++;
                }
            }
            return reservationsCounter;
        }



        public async Task<List<Book>> GetAllAsync()
        {
            return await _context.Book.ToListAsync();
        }
        //gets a list of books with current stock of them.
        public async Task<List<Book>> GetAllAsyncCurrentCount()
        {
            List<Book> allBooks =  await _context.Book.ToListAsync();
            foreach (Book book in allBooks)
            {
                book.Count -= await CountReservationsForBookId(book.Id);
            }
            return allBooks;
        }
        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.Book.FirstOrDefaultAsync(i=> i.Id == id);
        }

        public async Task AddBook(Book book)
        {
            _context.Book.Add(book);
            await _context.SaveChangesAsync();
        }
    }
}
