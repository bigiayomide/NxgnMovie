using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.ViewModels
{
    public class CategoryViewModel
    {
        public CategoryViewModel()
        {
            Movies = new HashSet<MovieViewModel>();
        }
        public int id { get; set; }
        public string title { get; set; }
        internal ICollection<MovieViewModel> Movies { get; set; }
    }
}
