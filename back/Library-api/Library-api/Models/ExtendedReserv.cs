using Microsoft.VisualBasic;
using System.Net;

namespace Library_api.Models
{
    public class ExtendedReserv
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public string? BookTitle { get; set; }
        public string? Username { get; set; }
        public DateTime? DueDate { get; set; }

        public ExtendedReserv(int id, int bookId, int userId, string bookTitle, string username, DateTime? dueDate)
        {
            Id = id;
            BookId = bookId;
            UserId = userId;
            BookTitle = bookTitle;
            Username = username;
            DueDate = dueDate;
        }

    }
}
