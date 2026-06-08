import axios from "axios";

const USERNAME = "nisatsama";

export const getGithubStats = async () => {
  const response = await axios.get(`https://api.github.com/users/${USERNAME}`);

  return {
    repos: response.data.public_repos,
    followers: response.data.followers,
    following: response.data.following,
  };
};
