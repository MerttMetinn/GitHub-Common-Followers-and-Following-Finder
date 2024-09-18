using commonUsers.API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace commonUsers.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FollowersController : ControllerBase
    {
        private readonly IFollowersService _followersService;

        public FollowersController(IFollowersService followersService)
        {
            _followersService = followersService;
        }

        [HttpGet("common")]
        public async Task<IActionResult> GetCommonFollowers(string user1, string user2)
        {
            if (string.IsNullOrEmpty(user1) || string.IsNullOrEmpty(user2))
            {
                return BadRequest("Usernames cannot be empty.");
            }

            if (user1.Equals(user2, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Usernames cannot be the same. Please provide different usernames.");
            }

            try
            {
                var user1Followers = await _followersService.GetFollowers(user1);
                var user2Followers = await _followersService.GetFollowers(user2);

                if (user1Followers == null || user2Followers == null)
                {
                    return NotFound("User not found.");
                }

                var commonFollowers = user1Followers
                    .Where(f1 => user2Followers.Any(f2 => f2.Username == f1.Username))
                    .ToList();

                return Ok(commonFollowers);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, $"GitHub API is unreachable: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }

        [HttpGet("common-following")]
        public async Task<IActionResult> GetCommonFollowing(string user1, string user2)
        {
            if (string.IsNullOrEmpty(user1) || string.IsNullOrEmpty(user2))
            {
                return BadRequest("Usernames cannot be empty.");
            }

            if (user1.Equals(user2, StringComparison.OrdinalIgnoreCase))
            {
                return BadRequest("Usernames cannot be the same. Please provide different usernames.");
            }

            try
            {
                var user1Following = await _followersService.GetFollowing(user1);
                var user2Following = await _followersService.GetFollowing(user2);

                if (user1Following == null || user2Following == null)
                {
                    return NotFound("User not found.");
                }

                var commonFollowing = user1Following
                    .Where(f1 => user2Following.Any(f2 => f2.Username == f1.Username))
                    .ToList();

                return Ok(commonFollowing);
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(503, $"GitHub API is unreachable: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}
