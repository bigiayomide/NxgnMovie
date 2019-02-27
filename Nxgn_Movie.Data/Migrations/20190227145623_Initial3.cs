using Microsoft.EntityFrameworkCore.Migrations;

namespace NxgnMovie.Data.Migrations
{
    public partial class Initial3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryName",
                schema: "nxg",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                schema: "nxg",
                table: "Categories",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                schema: "nxg",
                table: "Categories");

            migrationBuilder.AddColumn<string>(
                name: "CategoryName",
                schema: "nxg",
                table: "Categories",
                maxLength: 200,
                nullable: false,
                defaultValue: "");
        }
    }
}
