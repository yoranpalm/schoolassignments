using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BierCore.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BierCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BierController : ControllerBase
    {
        private readonly bierContext _context;

        public BierController(bierContext context)
        {
            _context = context;
        }

        // GET: api/Biers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Bier>>> GetBier()
        {
            return await _context.Bier.ToListAsync();
        }

        // GET: api/Biers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Bier>> GetBier(int id)
        {
            var bier = await _context.Bier.FindAsync(id);

            if (bier == null)
            {
                return NotFound();
            }

            return bier;
        }

        // PUT: api/Biers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBier(int id, Bier bier)
        {
            if (id != bier.Id)
            {
                return BadRequest();
            }

            _context.Entry(bier).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BierExists(id))
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

        // POST: api/Biers
        [HttpPost]
        public async Task<ActionResult<Bier>> PostBier(Bier bier)
        {
            _context.Bier.Add(bier);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBier", new { id = bier.Id }, bier);
        }

        // DELETE: api/Biers/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Bier>> DeleteBier(int id)
        {
            var bier = await _context.Bier.FindAsync(id);
            if (bier == null)
            {
                return NotFound();
            }

            _context.Bier.Remove(bier);
            await _context.SaveChangesAsync();

            return bier;
        }

        private bool BierExists(int id)
        {
            return _context.Bier.Any(e => e.Id == id);
        }
    }
}
