using System.Net.Http;
using System.Threading.Tasks;
using commonUsers.API.Interfaces;
using commonUsers.API.Models;
using Newtonsoft.Json;

namespace commonUsers.API.Services
{
    public class FollowersService : IFollowersService
    {
        private readonly HttpClient _httpClient;

        public FollowersService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.DefaultRequestHeaders.Add("User-Agent", "commonUsers.API");
        }

        public async Task<List<Follower>> GetFollowers(string username)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://api.github.com/users/{username}/followers");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Follower>>(content);
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching followers for user {username}: {ex.Message}");
            }
        }

        public async Task<List<Follower>> GetFollowing(string username)
        {
            try
            {
                var response = await _httpClient.GetAsync($"https://api.github.com/users/{username}/following");
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                return JsonConvert.DeserializeObject<List<Follower>>(content);
            }
            catch (HttpRequestException ex)
            {
                throw new Exception($"Error fetching following for user {username}: {ex.Message}");
            }
        }
    }
}
