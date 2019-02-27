using Microsoft.EntityFrameworkCore.Migrations;

namespace NxgnMovie.Data.Migrations
{
    public partial class Initial6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Movie_FK_CategoryID",
                schema: "nxg",
                table: "Movies",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Movie_FK_CategoryID",
                schema: "nxg",
                table: "Movies");
        }
    }
}
