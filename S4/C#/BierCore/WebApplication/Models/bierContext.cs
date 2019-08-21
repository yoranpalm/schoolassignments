using System;
using BierCore.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BierCore.Models
{
    public partial class bierContext : DbContext
    {
        public bierContext()
        {
        }

        public bierContext(DbContextOptions<bierContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Bier> Bier { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseMySql("Server=localhost;Database=bier;User=root;Password=pass123;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Bier>(entity =>
            {
                entity.ToTable("bier");

                entity.Property(e => e.Id)
                    .HasColumnName("id")
                    .HasColumnType("int(11)");

                entity.Property(e => e.Brouwer)
                    .HasColumnName("brouwer")
                    .HasColumnType("varchar(40)");

                entity.Property(e => e.Gisting)
                    .HasColumnName("gisting")
                    .HasColumnType("varchar(40)");

                entity.Property(e => e.InkoopPrijs)
                    .HasColumnName("inkoop_prijs")
                    .HasColumnType("decimal(5,2)");

                entity.Property(e => e.Naam)
                    .HasColumnName("naam")
                    .HasColumnType("varchar(40)");

                entity.Property(e => e.Perc).HasColumnName("perc");

                entity.Property(e => e.Type)
                    .HasColumnName("type")
                    .HasColumnType("varchar(40)");
            });
        }
    }
}
