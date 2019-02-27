using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json.Serialization;
using NxgnMovie.API.Core;
using NxgnMovie.Data;
using NxgnMovie.Data.Contracts;
using NxgnMovie.Data.Repository.Repositories;
using Swashbuckle.AspNetCore.Swagger;

namespace Nxgn_Movie
{
    public class Startup
    {
        private static string _applicationPath = string.Empty;
        string sqlConnectionString = string.Empty;
        public Startup(IHostingEnvironment env)
        {
            _applicationPath = env.WebRootPath;

            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            Configuration = builder.Build();
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public IServiceProvider ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<NgnxMovieContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IMovieRepository, MovieRepository>();

            services.AddMvc().AddJsonOptions(opts =>
            {
                opts.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            }).AddFluentValidation();

            var securitykey = Configuration["SecurityKey"];
            services.ConfigurejwtAuth(securitykey);

            services.AddIdentity<IdentityUser, IdentityRole>(
                              op => { op.Tokens.PasswordResetTokenProvider = TokenOptions.DefaultEmailProvider; })
                                      .AddDefaultTokenProviders()
                                      .AddSignInManager()
                                      .AddEntityFrameworkStores<NgnxMovieContext>()
                                      .AddDefaultTokenProviders();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                    new Info
                    {
                        Title = "Movie API",
                        Version = "v1",
                        Description = "Nxgn Movie Application API",
                        TermsOfService = "None",
                        Contact = new Contact
                        {
                            Name = "Ayomide Fajobi",
                            Email = string.Empty,
                            Url = "https://www.instagram.com/iamayof/"
                        }
                    });
                c.AddSecurityDefinition("Bearer", new ApiKeyScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = "header",
                    Type = "apiKey"
                });
            });


            services.AddAutoMapper();
            services.AddSignalR();
            services.AddCors();

            return services.BuildServiceProvider();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "MyAPI V1");
            });

            app.UseAuthentication();
            app.UseCors(builder => builder.AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader()
             .AllowCredentials());

            //app.UseSignalR(routes =>
            //{
            //    routes.MapHub<NotifyHub>("/NotifyEventDetail");
            //});

            app.ConfigureExceptionHandler(loggerFactory);
            app.UseMvcWithDefaultRoute();
            app.UseDefaultFiles();
            app.UseStaticFiles();

            NxgnDbInitializer.Initialize(app.ApplicationServices);
        }
    }
}
