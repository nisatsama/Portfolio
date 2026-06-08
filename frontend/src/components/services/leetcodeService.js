import axios from "axios";

export const getLeetcodeStats = async () => {
  const response = await axios.get("http://localhost:5000/api/leetcode");

  return response.data;
};
