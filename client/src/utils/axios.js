import axios from "axios";
import { baseURL } from "./urls";

export const request = axios.create({ baseURL });