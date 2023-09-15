using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Programmingzadanie3.Models;

namespace Programmingzadanie3.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        private readonly ToolContext _context;

        public ToolsController(ToolContext context)
        {
            _context = context;
        }

        // GET: api/Tools
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tool>>> GetTool()
        {
          if (_context.Tool == null)
          {
              return NotFound();
          }
            return await _context.Tool.ToListAsync();
        }

        // GET: api/Tools/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tool>> GetTool(int id)
        {
          if (_context.Tool == null)
          {
              return NotFound();
          }
            var tool = await _context.Tool.FindAsync(id);

            if (tool == null)
            {
                return NotFound();
            }

            return tool;
        }

        // PUT: api/Tools/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTool(int id, Tool tool)
        {
            if (id != tool.id)
            {
                return BadRequest();
            }

            _context.Entry(tool).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToolExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Tools
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tool>> PostTool(Tool tool)
        {
            if (_context.Tool == null)
            {
                return Problem("Entity set 'ToolContext.Tool'  is null.");
            }
            _context.Tool.Add(tool);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTool), new { id = tool.id }, tool);
        }

        // DELETE: api/Tools/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTool(int id)
        {
            if (_context.Tool == null)
            {
                return NotFound();
            }
            var tool = await _context.Tool.FindAsync(id);
            if (tool == null)
            {
                return NotFound();
            }

            _context.Tool.Remove(tool);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ToolExists(int id)
        {
            return (_context.Tool?.Any(e => e.id == id)).GetValueOrDefault();
        }
    }
}
