using AutoMapper;
using DoctorsSearchApp.Common.DTOs;
using DoctorsSearchApp.Common.Entities;
using DoctorsSearchApp.Common.Interfaces;

namespace DoctorsSearchApp.BL.Services
{
    public class DoctorService : IDoctorService
    {
        private readonly IDoctorRepository _doctorRepository;
        private readonly ILanguageRepository _languageRepository;
        private readonly IMapper _mapper;
        private readonly List<ContactFormDto> _contactForms = new();

        public DoctorService(
            IDoctorRepository doctorRepository,
            ILanguageRepository languageRepository,
            IMapper mapper)
        {
            _doctorRepository = doctorRepository ?? throw new ArgumentNullException(nameof(doctorRepository));
            _languageRepository = languageRepository ?? throw new ArgumentNullException(nameof(languageRepository));
            _mapper = mapper ?? throw new ArgumentNullException(nameof(mapper));
        }

        public async Task<IEnumerable<DoctorDto>> GetDoctorsAsync(FilterOptionsDto filters)
        {
            var doctors = await _doctorRepository.GetAllAsync();
            var languages = await _languageRepository.GetLanguageDictionaryAsync();

            if (filters.ShowActiveOnly)
                doctors = doctors.Where(d => d.IsActive);

            if (filters.ShowPayingOnly)
                doctors = doctors.Where(d => d.PromotionLevel <= 5);

            var doctorDtos = doctors.Select(d =>
            {
                var dto = _mapper.Map<DoctorDto>(d);
                dto.Languages = d.LanguageIds
                    .Select(id => languages.ContainsKey(id) ? languages[id] : string.Empty)
                    .Where(lang => !string.IsNullOrEmpty(lang))
                    .ToList();
                return dto;
            });

            return filters.SortBy == SortOption.RatingDesc
                ? SortDoctors(doctorDtos)
                : doctorDtos;
        }

        public async Task<DoctorDto?> GetDoctorByIdAsync(int id)
        {
            var doctor = await _doctorRepository.GetByIdAsync(id);
            if (doctor == null)
                return null;

            var languages = await _languageRepository.GetLanguageDictionaryAsync();
            var dto = _mapper.Map<DoctorDto>(doctor);
            dto.Languages = doctor.LanguageIds
                .Select(langId => languages.ContainsKey(langId) ? languages[langId] : string.Empty)
                .Where(lang => !string.IsNullOrEmpty(lang))
                .ToList();

            return dto;
        }

        public Task SaveContactFormAsync(ContactFormDto contactForm)
        {
            contactForm.SubmittedAt = DateTime.UtcNow;
            _contactForms.Add(contactForm);
            return Task.CompletedTask;
        }

        private IEnumerable<DoctorDto> SortDoctors(IEnumerable<DoctorDto> doctors)
        {
            return doctors
                .OrderByDescending(d => d.Rating)
                .ThenByDescending(d => d.TotalRatings)
                .ThenBy(d => d.PromotionLevel);
        }
    }
}