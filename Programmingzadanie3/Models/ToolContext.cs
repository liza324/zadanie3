using Microsoft.EntityFrameworkCore;
using System.Data.Common;

namespace Programmingzadanie3.Models;

    public class ToolContext : DbContext 
    { 
        public ToolContext(DbContextOptions<ToolContext> options)
            : base(options) 
        { 
        }
        public DbSet<Tool> Tool { get; set; }
    
    }
