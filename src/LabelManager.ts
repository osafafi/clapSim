// LabelManager.ts

import * as THREE from "three";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";

import { Director } from "./Director";

export class LabelManager extends THREE.Object3D {
  director: Director;

  constructor(director: Director) {
    super();
    this.director = director;
  }

  init() {}
}
