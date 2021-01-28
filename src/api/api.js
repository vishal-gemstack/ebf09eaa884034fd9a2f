import { API_KEY  } from "../config";
export const GET_ASTROID_DETAIL = `https://api.nasa.gov/neo/rest/v1/neo/astroidId?api_key=${API_KEY}`
export const GET_RANDOM_ASTROID = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${API_KEY}`