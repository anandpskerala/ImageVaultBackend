import "reflect-metadata";
import { container } from "tsyringe";
import { registerModels } from "@/containers/models.js";
import { registerRepositories } from "./repositories.js";
import { registerServices } from "@/containers/services.js";
import { registerController } from "./controllers.js";

registerModels();
registerRepositories();
registerServices();
registerController();

export { container };