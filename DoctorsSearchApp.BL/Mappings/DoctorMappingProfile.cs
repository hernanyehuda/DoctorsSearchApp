using AutoMapper;
using DoctorsSearchApp.Common.DTOs;
using DoctorsSearchApp.Common.Entities;
using System.Text.RegularExpressions;

namespace DoctorsSearchApp.BL.Mappings
{
    public class DoctorMappingProfile : Profile
    {
        public DoctorMappingProfile()
        {
            CreateMap<Doctor, DoctorDto>()
                .ForMember(dest => dest.MainSpecialty,
                    opt => opt.MapFrom(src => src.MainSpecialtiesIds.FirstOrDefault() ?? string.Empty))
                .ForMember(dest => dest.Address,
                    opt => opt.MapFrom(src => FormatAddress(src.Clinics.FirstOrDefault(c => c.IsActive) ?? src.Clinics.FirstOrDefault())))
                .ForMember(dest => dest.Phone,
                    opt => opt.MapFrom(src => FormatPhoneNumber(src.Phones.FirstOrDefault() != null ? src.Phones.FirstOrDefault().Number : string.Empty)))
                .ForMember(dest => dest.Rating,
                    opt => opt.MapFrom(src => src.Reviews.AverageRating))
                .ForMember(dest => dest.TotalRatings,
                    opt => opt.MapFrom(src => src.Reviews.TotalRatings))
                .ForMember(dest => dest.Languages,
                    opt => opt.Ignore()); 
        }

        private static string FormatAddress(Clinic? clinic)
        {
            if (clinic?.Address == null)
                return string.Empty;

            return $"{clinic.Address.Street}, {clinic.Address.CityName}";
        }

        private static string FormatPhoneNumber(string? phone)
        {
            if (string.IsNullOrEmpty(phone))
                return string.Empty;

            var cleaned = Regex.Replace(phone, @"[^\d]", "");

            if (cleaned.Length >= 3)
            {
                var prefix = cleaned.Substring(0, cleaned.StartsWith("0") ? 3 : 2);
                var rest = cleaned.Substring(prefix.Length);
                return $"{prefix}-{rest}";
            }

            return phone;
        }
    }
}