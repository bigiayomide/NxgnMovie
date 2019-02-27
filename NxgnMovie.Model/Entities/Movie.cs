using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace NxgnMovie.Model.Entities
{
    [Table("Movies", Schema = "nxg")]
    public class Movie : IEntityBase
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Required]
        [MaxLength(200, ErrorMessage = "Too many Characters. Maximum is 200")]
        public string Description { get; set; }

        [Required]
        [MaxLength(100, ErrorMessage = "Too many Characters. Maximum is 100")]
        public string Title { get; set; }

        [MaxLength(5, ErrorMessage = "please choose a value from 1 to 5")]
        [Required]
        public int Rating { get; set; }

        [Required]
        [Column("FK_CategoryID")]
        [ForeignKey("FK_CategoryID")]
        public int CategoryID { get; set; }

        [ForeignKey("FK_CategoryID")]
        public Category Category { get; set; }

    }

    public class MovieConfiguration : IEntityTypeConfiguration<Movie>
    {
        public void Configure(EntityTypeBuilder<Movie> builder)
        {
            builder.HasOne(x => x.Category)
                .WithMany(x => x.Movies)
                .HasForeignKey(x => x.CategoryID);
        }
    }
}
