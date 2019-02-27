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

namespace NxgnCategory.API.Controllers
{
    [Produces("application/json")]
    [Route("api/Category")]
    [ProducesResponseType(201)]
    [ProducesResponseType(200)]
    [ProducesResponseType(400)]
    [ProducesResponseType(401)]
    [ProducesResponseType(404)]
    //[Authorize(Policy = "Bearer")]
    public class CategoryController : Controller
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository categoryRepository, IMapper mapper)
        {
            _categoryRepository = categoryRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public IActionResult Get(long id)
        {
            Category _category = _categoryRepository.GetSingle(u => u.Id == id);
            if (_category != null)
            {
                CategoryViewModel _categoryVM = _mapper.Map<Category, CategoryViewModel>(_category);
                Log.Information("Category {@_categoryVM} retrieved from database", _categoryVM);
                return new OkObjectResult(new ResultVM() { Status = Status.Success, Data = _categoryVM });
            }
            else
            {
                Log.Warning("Could not find Category wit Id  {@id}", id);
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CategoryViewModel categoryvm)
        {
            if (!ModelState.IsValid || categoryvm == null)
            {
                return BadRequest(ModelState);
            }
            var g = _categoryRepository.GetSingle(u => u.Title.ToLower().Equals(categoryvm.title));
            if (_categoryRepository.GetSingle(u => u.Title.ToLower().Equals(categoryvm.title.ToLower())) == null)
            {
                Category _newcategory = _mapper.Map<CategoryViewModel, Category>(categoryvm);


                Category _newCreatedCategory = _categoryRepository.Add(_newcategory);
                _categoryRepository.Commit();

                if (_newCreatedCategory == null)
                {
                    Log.Error("Error Inserting Category {@categoryvm} Into database", categoryvm);
                    return NotFound(new ResultVM() { Status = Status.Error, Message = "An Error Occuered Could not create Category " + categoryvm.title, Data = categoryvm });
                }

                categoryvm = _mapper.Map<Category, CategoryViewModel>(_newCreatedCategory);
                Log.Information("Category {@categoryvm} Inserted from database", categoryvm);
                return new OkObjectResult(new ResultVM() { Status = Status.Success, Message = "Succesfully Created Category: " + categoryvm.title, Data = categoryvm });
            }
            else
                return new ConflictObjectResult(new ResultVM() { Status = Status.Error, Message = $" Category Title { categoryvm.title } already exist" , Data = categoryvm });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(long id)
        {
            Category _category = _categoryRepository.GetSingle(u => u.Id == id);
            if (_category != null)
            {
                _categoryRepository.Delete(_category);
                _categoryRepository.Commit();
                CategoryViewModel _categoryVM = _mapper.Map<Category, CategoryViewModel>(_category);
                Log.Information("Category {@_categoryVM} Deleted from database", _categoryVM);
                return new OkObjectResult(new ResultVM() { Status = Status.Success, Message = "Succesfully Deleted Category: " + _categoryVM.title, Data = _categoryVM });
            }
            else
            {
                Log.Error("Error Occured Deleting Category from database");
                return NotFound(new ResultVM() { Status = Status.Error, Message = "An Error Occured: ", Data = null });
            }
        }

        [HttpGet]
        public IActionResult GetAllCategorys()
        {
            IEnumerable<Category> _category = _categoryRepository.GetAll();
            if (_category != null)
            {
                IEnumerable<CategoryViewModel> _categoryVM = _mapper.Map<IEnumerable<Category>, IEnumerable<CategoryViewModel>>(_category);
                Log.Information("Category {@_categoryVM} retrieved from database", _categoryVM);
                return new OkObjectResult(new ResultVM() { Data = _categoryVM, Status = Status.Success });
            }
            else
            {
                Log.Error("Error Occured Retrieving Categorys from database");
                return NotFound(new ResultVM() { Data = "An Error Occured", Status = Status.Error });
            }
        }

        [HttpPatch]
        public IActionResult Update([FromBody] CategoryViewModel categoryvm)
        {
            if (categoryvm != null)
            {
                Category _newcategory = _mapper.Map<CategoryViewModel, Category>(categoryvm);
                _categoryRepository.Update(_newcategory);
                _categoryRepository.Commit();
                CategoryViewModel _categoryVM = _mapper.Map<Category, CategoryViewModel>(_newcategory);
                Log.Information("Category {@_categoryVM} Updated to database", _categoryVM);
                return new OkObjectResult(new ResultVM() { Data = _categoryVM, Status = Status.Success });
            }
            else
            {
                Log.Error("Error Occured Updating Category {@categoryvm}", categoryvm);
                return NotFound(new ResultVM() { Data = "An Error Occured", Status = Status.Error });
            }
        }
    }
}
