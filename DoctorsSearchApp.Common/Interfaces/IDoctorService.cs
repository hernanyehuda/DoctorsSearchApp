using DoctorsSearchApp.Common.DTOs;

namespace DoctorsSearchApp.Common.Interfaces
{
    public interface IDoctorService
    {
        Task<IEnumerable<DoctorDto>> GetDoctorsAsync(FilterOptionsDto filters);
        Task<DoctorDto?> GetDoctorByIdAsync(int id);
        Task SaveContactFormAsync(ContactFormDto contactForm);
    }
}