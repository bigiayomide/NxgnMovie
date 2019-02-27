using NxgnMovie.Data.Contracts;
using NxgnMovie.Model.Entities;

namespace NxgnMovie.Data.Repository.Repositories
{
    public class MovieRepository : EntityBaseRepository<Movie>, IMovieRepository
    {
        public MovieRepository(NgnxMovieContext context)
         : base(context)
        {
        }
    }
}
