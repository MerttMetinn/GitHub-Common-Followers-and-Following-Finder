
# GitHub Common Followers and Following Finder

This project allows you to compare two GitHub users and find their common followers and following. The application provides a visual representation of common followers and following using a Venn diagram.

## Features

- Compare two GitHub users.
- Display common followers and following.
- Visualize common connections with Venn diagrams.
- Handle errors and invalid inputs gracefully.

## Technologies Used

- **Frontend:**
  - React
  - Axios
  - Tailwind CSS
  - Framer Motion
  - Lucide React Icons

- **Backend:**
  - ASP.NET Core Web API
  - C#
  - GitHub REST API

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [ASP.NET Core](https://dotnet.microsoft.com/download) (v8 or higher)

### Frontend

1. Clone the repository:
   ```bash
   git clone https://github.com/MerttMetinn/GitHub-Common-Followers-and-Following-Finder.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd GitHub-Common-Followers-and-Following-Finder/commonUsers.Client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

### Backend

1. Navigate to the backend directory:
   ```bash
   cd GitHub-Common-Followers-and-Following-Finder/commonUsers.API
   ```

2. Restore the dependencies:
   ```bash
   dotnet restore
   ```

3. Start the application:
   ```bash
   dotnet run
   ```

## Usage

1. Open the frontend application in your browser (typically at `http://localhost:5173`).

2. Enter the GitHub usernames of the two users you want to compare.

3. Click the "Compare Users" button to fetch and display the common followers and following.

4. View the results and Venn diagrams showing the common connections.

## API Endpoints

- `GET /api/followers/common?user1={username1}&user2={username2}`: Fetch common followers of the two users.
- `GET /api/followers/common-following?user1={username1}&user2={username2}`: Fetch common following of the two users.

## Error Handling

- If either username is missing or the same, an error message will be displayed.
- If there's an issue with fetching data from GitHub or another error occurs, an appropriate error message will be shown.

## Contributing

Feel free to contribute to this project by submitting issues or pull requests. Please follow the standard GitHub workflow for contributions.

## License

This project is licensed under the [MIT License](LICENSE).
