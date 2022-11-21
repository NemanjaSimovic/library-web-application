using Library_api.Data;
using Library_api.Models;
using Library_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Library_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReservationController : ControllerBase
    {
        private readonly ReservationService _reservatonService;

        public ReservationController(DataContext dataContext)
        {
            _reservatonService = new ReservationService(dataContext);
        }

        [HttpGet]
        public async Task<ActionResult<List<Reservation>>> GetAllReservations()
        {
            return Ok(await _reservatonService.GetAllAsync());
        }
        [HttpGet]
        [Route("unapproved")]
        public async Task<ActionResult<List<Reservation>>> GetUnapprovedReservations()
        {
            List<Reservation> reservations = await _reservatonService.GetAllUnapprovedAsync();

            return Ok(await _reservatonService.ReservationListToExtendedReservList(reservations));
        }
        [HttpGet]
        [Route("approved")]
        public async Task<ActionResult<List<ExtendedReserv>>> GetApprovedExtendedReservations()
        {
            List<Reservation> reservations = await _reservatonService.GetAllApprovedAsync();

            return Ok(await _reservatonService.ReservationListToExtendedReservList(reservations));
        }

        [HttpGet]
        [Route("approved/notextended")]
        public async Task<ActionResult<List<Reservation>>> GetApprovedReservations()
        {
            return Ok(await _reservatonService.GetAllApprovedAsync());
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<List<ExtendedReserv>>> GetExtendedReservationsByUserId(int userId)
        {
            List<Reservation> reservList =  await _reservatonService.GetReservationsByUserIdAsync(userId);
            
            return Ok(await _reservatonService.ReservationListToExtendedReservList(reservList));
        }

        //bitno je da se ovde vracaju knjige kako bi se osvezila stranica gde korisnik rezervise knjigu.
        [HttpPost]
        public async Task<ActionResult<List<Book>>> AddReservation(Reservation reservation)
        {
            //Since not books, nor users can not be removed by task's definition;
            //theese checks are not necessary, so i will not be checking them in all methods
            //however i did it here, because realisticlly, system would have deletion of books,
            //therefor theese checks would come in handy.
            bool userInDB = await _reservatonService.CheckUserIdInDB(reservation.UserId);
            if (userInDB == false)
            {
                return NotFound("User is not in database!");
            }

            bool bookInDB = await _reservatonService.CheckBookIdInDB(reservation.BookId);
            if (bookInDB == false)
            {
                return NotFound("Book is not in database!");
            }

            bool userReservationLimitReached = await _reservatonService.CheckUserReservationLimitReached(reservation.UserId);
            if (userReservationLimitReached)
            {
                return Unauthorized("Sorry, you have reached reservation count limit!");
            }
            bool bookAvailable = await _reservatonService.CheckBookAvailable(reservation.BookId);
            if (bookAvailable == false)
            {
                return Unauthorized("Sorry, that book is not in stock!");
            }
            Reservation reservationEdited = reservation;
            reservationEdited.DueDate = null;
            return Ok(await _reservatonService.AddReservationReturnBooksCurCount(reservationEdited));
        }




        [HttpGet]
        [Route("user/limit/reached")]
        public async Task<ActionResult<bool>> CheckUserReservationLimitReached(int userId)
        {
            return Ok(await _reservatonService.CheckUserReservationLimitReached(userId));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<ExtendedReserv>>> DeleteReturnExtendedReservApprovedList(int id)
        {

            await _reservatonService.removeReservation(id);
            List<Reservation> approvedExReservs = await _reservatonService.GetAllApprovedAsync();

            return Ok(await _reservatonService.ReservationListToExtendedReservList(approvedExReservs));
        }

        //napravi metodu koja ce da updatuje dueDate rezervacije s datim id-em
        //todo: 
        [HttpPut("{id}")]
        public async Task<ActionResult<List<ExtendedReserv>>> DeleteReturnExtendedReservApprovedList(int id, [FromBody] Reservation body)
        {
            var reservation = await _reservatonService.FindReservation(id);
            if (reservation == null)
            {
                return BadRequest("Reservation not found in database!");
            }
            if (reservation.DueDate != null)
            {
                return BadRequest("This reservation has already been approved");
            }

            var reservationUpdated = await _reservatonService.UpdateReservation(id, body);
            if (!reservationUpdated)
            {
                return BadRequest("Reservation not found in database!");
            }

            List<Reservation> unapprovedExReservs = await _reservatonService.GetAllUnapprovedAsync();

            return Ok(await _reservatonService.ReservationListToExtendedReservList(unapprovedExReservs));
        }
    }
}
