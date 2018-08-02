import { World } from "../src/world/World";

const world = World.createWorld();
let description;
let directions;

console.log(`${world.getRoomDescription(0)} ${world.getRoomDirections(0, -1)}`);
console.log(`${world.getRoomDescription(1)} ${world.getRoomDirections(1, 0)}`);
console.log(`${world.getRoomDescription(1)} ${world.getRoomDirections(1, 2)}`);
console.log(`${world.getRoomDescription(2)} ${world.getRoomDirections(2, 1)}`);
