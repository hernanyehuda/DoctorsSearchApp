using DoctorsSearchApp.Common.Entities;
using DoctorsSearchApp.Common.Interfaces;

namespace DoctorsSearchApp.DAL.Repositories
{
    public class DoctorRepository : BaseRepository<Doctor>, IDoctorRepository
    {
        public DoctorRepository() : base("doctors.json")
        {
        }

        public async Task<IEnumerable<Doctor>> GetActiveDoctorsAsync()
        {
            var doctors = await GetAllAsync();
            return doctors.Where(d => d.IsActive);
        }

        public async Task<IEnumerable<Doctor>> GetPayingDoctorsAsync()
        {
            var doctors = await GetAllAsync();
            return doctors.Where(d => d.PromotionLevel <= 5);
        }
    }
}