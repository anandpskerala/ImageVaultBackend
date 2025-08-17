import { config } from "@/config.js";
import App from "@/app.js";

const server = new App();

server.listen(config.port);