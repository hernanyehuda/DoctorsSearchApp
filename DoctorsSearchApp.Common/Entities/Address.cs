using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DoctorsSearchApp.Common.Entities
{
    public class Address
    {
        public string CityName { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string CityId { get; set; } = string.Empty;
    }
}
