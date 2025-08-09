namespace DoctorsSearchApp.Common.DTOs
{
    public class FilterOptionsDto
    {
        public bool ShowActiveOnly { get; set; }
        public bool ShowPayingOnly { get; set; }
        public SortOption SortBy { get; set; } = SortOption.RatingDesc;
    }

    public enum SortOption
    {
        RatingDesc,
        Default
    }
}