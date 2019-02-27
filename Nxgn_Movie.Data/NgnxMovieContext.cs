using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using NxgnMovie.Model.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace NxgnMovie.Data
{
    public class NgnxMovieContext : IdentityDbContext<IdentityUser>
    {
        private IConfiguration _configuration;
        public NgnxMovieContext() { }

        public NgnxMovieContext(DbContextOptions<NgnxMovieContext> options, IConfiguration configuration)
            : base(options)
        {
            _configuration = configuration;
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Movie> Movies { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new MovieConfiguration());
            builder.ApplyConfiguration(new CategoryConfiguration());
            builder.Entity<Category>().ToTable("Categories","nxg");
            builder.Entity<Movie>().ToTable("Movies", "nxg");
            builder.Entity<IdentityUser>().ToTable("Users", "nxg");
            builder.Entity<IdentityRole>().ToTable("Roles", "nxg");
            builder.Entity<IdentityUserRole<string>>().ToTable("UserRoles", "nxg");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims","nxg");
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins","nxg"); ;
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims","nxg"); ;
            builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens", "nxg");
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_configuration.GetConnectionString("DefaultConnection"));
        }
    }
}
