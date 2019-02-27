using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace NxgnMovie.Data
{
    public class NxgnDbInitializer
    {
        private static NgnxMovieContext context;
        public static void Initialize(IServiceProvider serviceProvider)
        {
            context = (NgnxMovieContext)serviceProvider.GetService(typeof(NgnxMovieContext));
            context.Database.Migrate();
            InitializeDatabase();
        }
        private static void InitializeDatabase()
        {
            if (!context.Categories.Any())
            {

            }
        }
    }
}
