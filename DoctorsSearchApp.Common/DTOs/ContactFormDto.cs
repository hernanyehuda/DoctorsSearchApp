using System.ComponentModel.DataAnnotations;

namespace DoctorsSearchApp.Common.DTOs
{
    public class ContactFormDto
    {
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [Phone]
        public string Phone { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public int DoctorId { get; set; }

        public DateTime SubmittedAt { get; set; } = DateTime.UtcNow;
    }
}