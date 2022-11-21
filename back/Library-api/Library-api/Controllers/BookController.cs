using Library_api.Data;
using Library_api.Models;
using Library_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Library_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookService _bookService;

        public BookController(DataContext dataContext)
        {
            _bookService = new BookService(dataContext);
        }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetAllBooks()
        {
            return Ok(await _bookService.GetAllAsync());
        }
        [HttpGet]
        [Route("currentcount")]
        public async Task<ActionResult<List<Book>>> GetAllBooksCurrentCount()
        {
            return Ok(await _bookService.GetAllAsyncCurrentCount());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(int id)
        {
            var book = await _bookService.GetByIdAsync(id);
            if(book == null)
            {
                return NotFound("Book with that Id does not exist in the Database!");
            }
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<List<Book>>> AddBook(Book book)
        {
            await _bookService.AddBook(book);
            return Ok(await _bookService.GetAllAsync());
        }
        [HttpPost]
        [Route("currentcount")]

        public async Task<ActionResult<List<Book>>> AddBookReturnCurrentCount(Book book)
        {
            await _bookService.AddBook(book);
            return Ok(await _bookService.GetAllAsyncCurrentCount());
        }
    }
}
