
using DoctorsSearchApp.Common.Entities;

namespace DoctorsSearchApp.Common.Interfaces
{
    public interface IDoctorRepository : IRepository<Doctor>
    {
        Task<IEnumerable<Doctor>> GetActiveDoctorsAsync();
        Task<IEnumerable<Doctor>> GetPayingDoctorsAsync();
    }
}
