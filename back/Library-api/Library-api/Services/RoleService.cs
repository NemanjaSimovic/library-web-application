using Library_api.Data;
using Library_api.Models;
using Microsoft.EntityFrameworkCore;

namespace Library_api.Services
{
    public class RoleService
    {
        private readonly DataContext _context;
        public RoleService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Role>> GetAllAsync()
        {
            return await _context.Role.ToListAsync();
        }
        public async Task<Role?> GetByIdAsync(int id)
        {
            return await _context.Role.FirstOrDefaultAsync(i => i.Id == id);
        }
    }
}
