using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.ViewModels
{
    public class MovieViewModel
    {

        public int id { get; set; }

        [Required]
        [MaxLength(200, ErrorMessage = "Too many Characters. Maximum is 200")]
        public string description { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too many Characters. Maximum is 100")]
        public string title { get; set; }


        public int rating { get; set; }

        [Required]

        public int category_id { get; set; }

        public CategoryViewModel category { get; set; }
    }
}
 