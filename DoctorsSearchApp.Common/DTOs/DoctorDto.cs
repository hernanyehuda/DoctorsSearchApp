namespace DoctorsSearchApp.Common.DTOs
{
    public class DoctorDto
    {
        public int Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string MainSpecialty { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public double Rating { get; set; }
        public int TotalRatings { get; set; }
        public int PromotionLevel { get; set; }
        public bool IsActive { get; set; }
        public List<string> Languages { get; set; } = new List<string>();
    }
}