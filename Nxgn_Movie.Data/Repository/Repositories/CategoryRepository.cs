using NxgnMovie.Data.Contracts;
using NxgnMovie.Model.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace NxgnMovie.Data.Repository.Repositories
{
    public class CategoryRepository: EntityBaseRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(NgnxMovieContext context)
         : base(context)
        {
        }

    }
}
