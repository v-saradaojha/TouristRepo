using Application.Activities;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActivitiesController : BaseApiController
    {

        [HttpGet]
        public async Task<IActionResult> GetActivities()
        {
            var result = await Mediator.Send(new List.Query());
            return HandleRequest(result);
        }        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query { Id = id });
            return HandleRequest(result);
        }
        [HttpPost]
        public async Task<IActionResult> CreateActivity([FromBody] Activity activity)
        {
            return HandleRequest(await Mediator.Send(new Create.Command { Activity = activity }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid Id, [FromBody] Activity activity)
        {
            activity.Id = Id;
            return HandleRequest(await Mediator.Send(new Edit.Command { Activity = activity }));

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid Id)
        {
            return HandleRequest(await Mediator.Send(new Delete.Command { Id = Id }));
        }


    }
}