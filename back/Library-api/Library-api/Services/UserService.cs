using Library_api.Data;
using Library_api.Models;
using Microsoft.EntityFrameworkCore;

namespace Library_api.Services
{
    public class UserService
    {
        private readonly DataContext _context;
        public UserService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<User>> GetAllAsync()
        {
            return await _context.User.ToListAsync();
        }
        public async Task<User?> GetByUsernameAndPass(string username, string password)
        {
            return await _context.User.FirstOrDefaultAsync(u => u.Username == username && u.Password == password);
        }
        public async Task<bool> UsernameExists(string username)
        {
            var usr = await _context.User.FirstOrDefaultAsync(u => u.Username == username);
            if (usr == null)
            {
                return false;
            }
            return true;
        }
    }
}
