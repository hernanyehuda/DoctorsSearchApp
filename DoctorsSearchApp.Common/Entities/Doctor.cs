using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorsSearchApp.Common.Entities
{
    public class Doctor
    {
        public int Id { get; set; }
        public int PromotionLevel { get; set; }
        public List<Clinic> Clinics { get; set; } = new List<Clinic>();
        public Reviews Reviews { get; set; } = new Reviews();
        public List<string> MainSpecialtiesIds { get; set; } = new List<string>();
        public List<Phone> Phones { get; set; } = new List<Phone>();
        public List<string> SubSpecialtiesIds { get; set; } = new List<string>();
        public List<string> LanguageIds { get; set; } = new List<string>();
        public string FullName { get; set; } = string.Empty;
        public List<string> AreaIds { get; set; } = new List<string>();
        public bool IsActive { get; set; }
    }
}
