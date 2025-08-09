using DoctorsSearchApp.Common.DTOs;
using DoctorsSearchApp.Common.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DoctorsSearchApp.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DoctorsController : ControllerBase
    {
        private readonly IDoctorService _doctorService;
        private readonly ILogger<DoctorsController> _logger;

        public DoctorsController(IDoctorService doctorService, ILogger<DoctorsController> logger)
        {
            _doctorService = doctorService ?? throw new ArgumentNullException(nameof(doctorService));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        [HttpPost("search")]
        public async Task<IActionResult> GetDoctors([FromBody] FilterOptionsDto filters)
        {
            try
            {
                _logger.LogInformation("Getting doctors with filters: {@Filters}", filters);
                var doctors = await _doctorService.GetDoctorsAsync(filters);
                _logger.LogInformation("Found {Count} doctors", doctors.Count());
                return Ok(doctors);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting doctors");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetDoctorById(int id)
        {
            try
            {
                _logger.LogInformation("Getting doctor with ID: {Id}", id);
                var doctor = await _doctorService.GetDoctorByIdAsync(id);

                if (doctor == null)
                {
                    _logger.LogWarning("Doctor with ID {Id} not found", id);
                    return NotFound(new { message = $"Doctor with ID {id} not found" });
                }

                return Ok(doctor);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while getting doctor {Id}", id);
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }

        [HttpPost("contact")]
        public async Task<IActionResult> SubmitContactForm([FromBody] ContactFormDto contactForm)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning("Invalid contact form submitted");
                    return BadRequest(ModelState);
                }

                _logger.LogInformation("Submitting contact form for doctor {DoctorId}", contactForm.DoctorId);
                await _doctorService.SaveContactFormAsync(contactForm);

                return Ok(new { message = "Contact form submitted successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while submitting contact form");
                return StatusCode(500, new { message = "An error occurred while processing your request" });
            }
        }
    }
}