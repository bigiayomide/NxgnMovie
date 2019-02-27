using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.ViewModels
{
    public class ResultVM
    {
        public Status Status { get; set; }
        public string Message { get; set; }
        public string Token { get; set; }
        public string Username { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public object Data { get; set; }

    }

    public enum Status
    {
        Success = 1,
        Error = 2
    }

}
