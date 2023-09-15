using Microsoft.EntityFrameworkCore;

namespace Programmingzadanie3.Models
{
    
        public class PersonContext : DbContext
        {
            public PersonContext(DbContextOptions<PersonContext> options)
                : base(options)
            {
            }
            public DbSet<Person> Person { get; set; }

        }
    }

