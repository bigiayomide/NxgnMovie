using AutoMapper;
using NxgnMovie.Model.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NxgnMovie.API.ViewModels.Mappings
{
    public class ViewModelToDomainMappingProfile : Profile
    {

        public ViewModelToDomainMappingProfile()
        {
            CreateMap<CategoryViewModel, Category>();
            CreateMap<MovieViewModel, Movie>();
        }
    }
}
