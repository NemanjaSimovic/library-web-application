using Library_api.Models;
using Microsoft.EntityFrameworkCore;

namespace Library_api.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Book> Book => Set<Book>();
        public DbSet<User> User => Set<User>();
        public DbSet<Role> Role => Set<Role>();
        public DbSet<Reservation> Reservation => Set<Reservation>();

        internal Task<Reservation> FindAsync(int id)
        {
            throw new NotImplementedException();
        }
    }
}
