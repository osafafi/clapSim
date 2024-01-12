//index.ts

import * as THREE from "three";

import { Director } from "./Director";

// Scene
const scene = new THREE.Scene();
// Fog
// scene.fog = new THREE.Fog(0x747fa8, 5, 36);

const director = new Director(scene);
