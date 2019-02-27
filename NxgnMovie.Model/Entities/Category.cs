using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace NxgnMovie.Model.Entities
{
    [Table("Categories", Schema ="nxg")]
    public class Category : IEntityBase
    {
        public Category()
        {
            Movies = new List<Movie>();
        }
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too many Characters. Maximum is 100")]
        public string Title { get; set; }
        public List<Movie> Movies { get; set; }

    }

    public class CategoryConfiguration : IEntityTypeConfiguration<Category>
    {
        public void Configure(EntityTypeBuilder<Category> builder)
        {
            builder.HasMany(x => x.Movies)
                 .WithOne(x => x.Category)
                 .HasForeignKey(x => x.CategoryID)
                 .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
