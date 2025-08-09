using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorsSearchApp.Common.Entities
{
    public class Reviews
    {
        public double ProfessionalismRate { get; set; }
        public double AverageRating { get; set; }
        public int TotalRatings { get; set; }
        public double WaitingTimeRate { get; set; }
        public double ServiceRate { get; set; }
    }
}
