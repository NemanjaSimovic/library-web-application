using Library_api.Data;
using Library_api.Models;
using Library_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly RoleService _roleService;

        public RoleController(DataContext dataContext)
        {
            _roleService = new RoleService(dataContext);
        }

        [HttpGet]
        public async Task<ActionResult<List<Role>>> GetAllBooks()
        {
            return Ok(await _roleService.GetAllAsync());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> GetBook(int id)
        {
            var role = await _roleService.GetByIdAsync(id);
            if (role == null)
            {
                return NotFound("Role with that Id does not exist in the Database!");
            }
            return Ok(role);
        }
    }
}
