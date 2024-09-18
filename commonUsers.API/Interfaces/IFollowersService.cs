using commonUsers.API.Models;

namespace commonUsers.API.Interfaces
{
    public interface IFollowersService
    {
        Task<List<Follower>> GetFollowers(string username);
        Task<List<Follower>> GetFollowing(string username);
    }
}
