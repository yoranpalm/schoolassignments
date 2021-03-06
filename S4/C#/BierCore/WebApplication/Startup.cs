﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BierCore.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace BierCore
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public IConfiguration Configuration
        {
            get;
        }

        // This method gets called by the runtime. Use this method to add services to
        // the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services
                .AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            var connection = @"Server=127.0.0.1;database=bier;user=root;pwd=pass123;";
            services.AddDbContext<bierContext>(options => options.UseMySql(connection));

            //cors
            services.AddCors(options =>
            {
                options.AddPolicy(MyAllowSpecificOrigins, builder =>
                {
                    builder
                        .WithOrigins("http://localhost")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin();
                });

            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP
        // request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors(MyAllowSpecificOrigins);
            app.UseMvc();
        }
    }
}
