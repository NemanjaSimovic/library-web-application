namespace Library_api.Models
{
    public class Reservation
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public int UserId { get; set; }
        public DateTime? DueDate{ get; set; }

        public Reservation(int bookId, int userId)
        {
            BookId = bookId;
            UserId = userId;
            DueDate = null;
        }

    }
}
