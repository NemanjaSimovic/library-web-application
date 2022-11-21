using Library_api.Data;
using Library_api.Models;
using Library_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Text.Json.Nodes;

namespace Library_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;

        public UserController(DataContext dataContext)
        {
            _userService = new UserService(dataContext);
        }

        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _userService.GetAllAsync());
        }
        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<bool>> Login([FromBody] User body)
        {
            if(body.Username == null || body.Password == null)
            {
                return NotFound("Username or password empty!");
            }
            bool usrExists = await _userService.UsernameExists(body.Username);
            if (usrExists == false)
            {
                return Unauthorized("No username in database found!");
            }
            var user = await _userService.GetByUsernameAndPass(body.Username, body.Password);
            if (user == null)
            {
                return Unauthorized("Wrong password!");
            }
            return Ok(user);
        }

    //    var book = await _bookService.GetByIdAsync(id);
    //        if(book == null)
    //        {
    //            return NotFound("Book with that Id does not exist in the Database!");
    //}
    //        return Ok(book);

}
}
