using Library_api.Data;
using Library_api.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.VisualBasic;
using System.Diagnostics.Metrics;

namespace Library_api.Services
{
    public class ReservationService
    {
        private readonly DataContext _context;
        private readonly int userReservationsLimit = 5;
        public ReservationService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<ExtendedReserv>> ReservationListToExtendedReservList(List<Reservation> reservations)
        {
            List<int> reservationIds = new();
            foreach (Reservation reservation in reservations)
            {
                reservationIds.Add(reservation.Id);
            }
            var tablica = await _context.Reservation
            .Join(_context.User, r => r.UserId, u => u.Id, (r, u) => new { r, u })
            .Join(_context.Book, comb => comb.r.BookId, b => b.Id, (comb, b) => new
            {
                Id = comb.r.Id,
                BookId = comb.r.BookId,
                UserId = comb.r.UserId,
                BookTitle = b.Title,
                Username = comb.u.Username,
                DueDate = comb.r.DueDate
            }
            ).Where(fullEntry => reservationIds.Contains(fullEntry.Id)).ToListAsync();

            List<ExtendedReserv> extendedReservs = new();
            foreach (var entry in tablica)
            {
                extendedReservs.Add(new ExtendedReserv(entry.Id, entry.BookId, entry.UserId, entry.BookTitle, entry.Username, entry.DueDate));
            }

            return extendedReservs;
        }


        public async Task<int> CountReservationsForBookId(int bookId)
        {
            return await _context.Reservation.CountAsync(i => i.BookId == bookId);
        }

        public async Task<int> CountReservationsForUserId(int userId)
        {
            return await _context.Reservation.CountAsync(i => i.UserId == userId);
        }

        public async Task<bool> CheckBookIdInDB(int bookId)
        {
            Book? book = await _context.Book.FirstOrDefaultAsync(b => b.Id == bookId);
            if (book == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> CheckUserIdInDB(int userId)
        {
            User? user = await _context.User.FirstOrDefaultAsync(u => u.Id == userId);
            if (user == null)
            {
                return false;
            }
            return true;
        }

        public async Task<bool> CheckBookAvailable(int bookId)
        {
            Book? book = await _context.Book.FirstOrDefaultAsync(i => i.Id == bookId);
            if (book == null)
            {
                return false;
            }
            int count = book.Count;
            count -= await CountReservationsForBookId(bookId);
            if (count > 0)
            {
                return true;
            }
            return false;
        }

        public async Task<bool> CheckUserReservationLimitReached(int userId)
        {
            int userReservationCounter = await CountReservationsForUserId(userId);
            if (userReservationCounter >= userReservationsLimit)
            {
                return true;
            }
            return false;
        }

        public async Task<List<Reservation>> GetAllAsync()
        {
            return await _context.Reservation.ToListAsync();
        }

        public async Task<List<Reservation>> GetAllUnapprovedAsync()
        {
            return await _context.Reservation.Where(r => r.DueDate == null).ToListAsync();
        }

        public async Task<List<Reservation>> GetAllApprovedAsync()
        {
            return await _context.Reservation.Where(r => r.DueDate != null).ToListAsync();
        }

        public async Task<List<Reservation>> GetReservationsByUserIdAsync(int userID)
        {
            List<Reservation> reservList = await _context.Reservation.Where(fullEntry => fullEntry.UserId == userID).ToListAsync();

            return reservList;
        }

        public async Task<List<Book>> AddReservationReturnBooksCurCount(Reservation reservation)
        {
            _context.Reservation.Add(reservation);
            await _context.SaveChangesAsync();

            List<Book> allBooks = await _context.Book.ToListAsync();
            foreach (Book book in allBooks)
            {
                book.Count -= await CountReservationsForBookId(book.Id);
            }
            return allBooks;
        }

        //todo:
        //public async Task<List<Reservation>> updateReservation(int id, string dueDate)
        //{
        //    var removingReservation = await _context.Reservation.FindAsync(id);
        //    _context.Reservation.Remove(removingReservation);
        //    await _context.SaveChangesAsync();
        //    return await _context.Reservation.ToListAsync();
        //}

        public async Task removeReservation(int id)
        {
            var removingReservation = await _context.Reservation.FindAsync(id);
            _context.Reservation.Remove(removingReservation);
            await _context.SaveChangesAsync();
        }

        public async Task<Reservation?> FindReservation(int id)
        {
            return await _context.Reservation.FindAsync(id);
        }

        //returns true of opertion was successfull, and returns false otherwise
        public async Task<bool> UpdateReservation(int id, Reservation updatedReserv)
        {
            var reservation = await _context.Reservation.FindAsync(id);
            if(reservation == null)
            {
                return false;
            }
            reservation.DueDate = updatedReserv.DueDate;
            reservation.BookId = updatedReserv.BookId;
            reservation.UserId = updatedReserv.UserId;

            await _context.SaveChangesAsync();
            return true;
        }
    }
}
