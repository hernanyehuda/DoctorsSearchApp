using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorsSearchApp.Common.Entities
{
    public class Clinic
    {
        public int Id { get; set; }
        public Address Address { get; set; } = new Address();
        public DateTime DateCreated { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<Phone> Phones { get; set; } = new List<Phone>();
        public bool IsActive { get; set; }
    }
}
