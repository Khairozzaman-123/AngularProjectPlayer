using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Evidence_Angular.Models
{
    public class Sport
    {
        public Sport()
        {
            this.Players = new List<Player>();
        }
        public int SportId { get; set; }
        [Required, StringLength(50)]
        public string SportName { get; set; }
        [Required, StringLength(30)]
        public string Popularity { get; set; }
        public virtual ICollection<Player> Players { get; set; }

    }
    public class Player
    {
        public int PlayerId { get; set; }
        [Required, StringLength(50)]
        public string PlayerName { get; set; }
        [Required, StringLength(30)]
        public string PlayerCategory { get; set; }
        [Required, Column(TypeName = "date")]
        public DateTime JoinDate { get; set; }
        [Required, StringLength(10)]
        public string Gender { get; set; }
        [Required, StringLength(150)]
        public string Picture { get; set; }
        [ForeignKey("Sport")]
        public int SportId { get; set; }
        //nev
        public virtual Sport Sport { get; set; }
    }
    public class SportDbContext : DbContext
    {
        public SportDbContext(DbContextOptions<SportDbContext> options) : base(options) { }
        public DbSet<Sport> Sport { get; set; }
        public DbSet<Player> Players { get; set; }

    }
}
