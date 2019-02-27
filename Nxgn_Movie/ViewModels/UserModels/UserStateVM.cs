using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.ViewModels.UserModels
{
    public class UserStateVM
    {
        public bool IsAuthenticated { get; set; }
        public string Username { get; set; }
    }
}
