using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NxgnMovie.API.ViewModels;
using NxgnMovie.Data.Contracts;
using NxgnMovie.Model.Entities;
using Serilog;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Movie")]
    [ProducesResponseType(201)]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(404)]
    [ProducesResponseType(409)]
    //[Authorize(Policy = "Bearer")]
    public class MovieController : Controller
    {
        private readonly IMovieRepository _movieRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public MovieController(IMovieRepository movieRepository, ICategoryRepository categoryRepository, IMapper mapper)
        {
            _movieRepository = movieRepository;
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            Movie _movie = _movieRepository.GetSingle(u => u.Id == id);
            if (_movie != null)
            {
                MovieViewModel _movieVM = _mapper.Map<Movie, MovieViewModel>(_movie);
                Log.Information("Movie {@_movieVM} retrieved from database", _movieVM);
                return new OkObjectResult(new ResultVM() { Status = Status.Success, Data = _movieVM });
            }
            else
            {
                Log.Warning("Could not find Movie wit Id  {@id}", id);
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] MovieViewModel movievm)
        {
            if (!ModelState.IsValid || movievm == null)
            {
                return BadRequest(ModelState);
            }

            if (_movieRepository.GetSingle(u => u.Title.ToLower().Equals(movievm.title.ToLower())) == null)
            {
                if (_categoryRepository.GetSingle(u => u.Id == movievm.category_id) != null)
                {
                    //Movie _newmovie = _mapper.Map<MovieViewModel, Movie>(movievm);

                    Movie _newmovie = new Movie()
                    {
                        CategoryID = movievm.category_id,
                        Description = movievm.description,
                        Title = movievm.title,
                        Rating = movievm.category_id
                    };

                    Movie _newCreatedMovie = _movieRepository.Add(_newmovie);
                    _movieRepository.Commit();

                    if (_newCreatedMovie == null)
                    {
                        Log.Error("Error Inserting Movie {@movievm} Into database", movievm);
                        return NotFound(new ResultVM() { Status = Status.Error, Message = "An Error Occuered Could not create Movie " + movievm.title, Data = movievm });
                    }

                    movievm = _mapper.Map<Movie, MovieViewModel>(_newCreatedMovie);
                    Log.Information("Movie {@movievm} Inserted from database", movievm);
                    return new OkObjectResult(new ResultVM() { Status = Status.Success, Message = "Succesfully Created Movie: " + movievm.title, Data = movievm });
                }
                else
                    return NotFound(new ResultVM() { Status = Status.Error, Message = $"An Error Occuered Could not create Movie: {movievm.title} because Category doesn't exist"  , Data = movievm });
            }
            else
                return new ConflictObjectResult(new ResultVM() { Status = Status.Error, Message = $"Movie { movievm.title } already exists" , Data = movievm });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Movie _movie = _movieRepository.GetSingle(u => u.Id == id);
            if (_movie != null)
            {
                _movieRepository.Delete(_movie);
                _movieRepository.Commit();
                MovieViewModel _movieVM = _mapper.Map<Movie, MovieViewModel>(_movie);
                Log.Information("Movie {@_movieVM} Deleted from database", _movieVM);
                return new OkObjectResult(new ResultVM() { Status = Status.Success, Message = "Succesfully Deleted Movie: " + _movieVM.title, Data = _movieVM });
            }
            else
            {
                Log.Error("Error Occured Deleting Movie from database");
                return NotFound(new ResultVM() { Status = Status.Error, Message = "An Error Occured: ", Data = null });
            }
        }

        [HttpGet]
        public IActionResult GetAllMovies()
        {
            IEnumerable<Movie> _movie = _movieRepository.AllIncluding(x=>x.Category);
            if (_movie != null)
            {
                IEnumerable<MovieViewModel> _movieVM = _mapper.Map<IEnumerable<Movie>, IEnumerable<MovieViewModel>>(_movie);
                Log.Information("Movie {@_movieVM} retrieved from database", _movieVM);
                return new OkObjectResult(new ResultVM() { Data = _movieVM, Status = Status.Success });
            }
            else
            {
                Log.Error("Error Occured Retrieving Movies from database");
                return NotFound(new ResultVM() { Data = "An Error Occured", Status = Status.Error });
            }
        }

        [HttpPatch]
        public IActionResult Update([FromBody] MovieViewModel movievm)
        {
            if (movievm != null)
            {
                Movie _newmovie = _mapper.Map<MovieViewModel, Movie>(movievm);
                _movieRepository.Update(_newmovie);
                _movieRepository.Commit();
                MovieViewModel _movieVM = _mapper.Map<Movie, MovieViewModel>(_newmovie);
                Log.Information("Movie {@_movieVM} Updated to database", _movieVM);
                return new OkObjectResult(new ResultVM() { Data = _movieVM, Status = Status.Success });
            }
            else
            {
                Log.Error("Error Occured Updating Movie {@movievm}", movievm);
                return NotFound(new ResultVM() { Data = "An Error Occured", Status = Status.Error });
            }
        }
    }
}
