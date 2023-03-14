import axios from "axios";
import { baseURL } from "./constants";

export const request = axios.create({ baseURL });