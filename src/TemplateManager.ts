import * as THREE from "three";
import { Director } from "./Director";

class TemplateManager extends THREE.Object3D {
  director: Director;

  constructor(director: Director) {
    super();
    this.director = director;
  }

  init() {}
}
