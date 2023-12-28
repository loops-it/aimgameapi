require("dotenv").config();
import { port } from './config';
import { listen } from "./app";

listen(port, () => {
    console.log(`Server listen on ${port}`);
});
