using Microsoft.EntityFrameworkCore.Migrations;

namespace NxgnMovie.Data.Migrations
{
    public partial class Initial4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Categories_FK_CategoryID",
                schema: "nxg",
                table: "Movies");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Categories_FK_CategoryID",
                schema: "nxg",
                table: "Movies",
                column: "FK_CategoryID",
                principalSchema: "nxg",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Categories_FK_CategoryID",
                schema: "nxg",
                table: "Movies");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Categories_FK_CategoryID",
                schema: "nxg",
                table: "Movies",
                column: "FK_CategoryID",
                principalSchema: "nxg",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
