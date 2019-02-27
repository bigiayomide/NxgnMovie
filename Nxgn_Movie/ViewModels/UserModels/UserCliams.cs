using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.ViewModels.UserModels
{
    public class UserClaims
    {
        public IEnumerable<ClaimVM> Claims { get; set; }
        public string UserName { get; set; }
    }
}
