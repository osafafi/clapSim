//CameraManager.ts

import * as THREE from "three";
import CameraControls from "camera-controls";
import { Director } from "./Director";

CameraControls.install({ THREE: THREE });

export class CameraManager extends THREE.Object3D {
  director: Director;
  navCam: THREE.PerspectiveCamera;
  navCamCtrl: CameraControls;
  cineCam: THREE.PerspectiveCamera;
  activeCam: THREE.PerspectiveCamera;

  constructor(director: Director) {
    super();
    this.director = director;

    // For dev & debug
    this.navCam = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.navCam.position.set(0, 50, 0);
    this.navCamCtrl = new CameraControls(this.navCam, document.body);

    // Cinematic Cam to use for rendering
    this.cineCam = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.cineCam.position.set(60, 50, 32);

    this.activeCam = this.navCam;

    this.init();
  }

  init() {
    this.navCamCtrl.enabled = true;
    this.navCamCtrl.dollyToCursor = false;
    this.navCamCtrl.smoothTime = 0.5;
    this.navCamCtrl.verticalDragToForward = true;
    this.navCamCtrl.maxPolarAngle = Math.PI / 2;
    this.navCamCtrl.setPosition(-12, 2, -25, false);
    this.navCamCtrl.setTarget(0, 0, -1);

    this.navCamCtrl.mouseButtons.left = CameraControls.ACTION.ROTATE;
    this.navCamCtrl.mouseButtons.middle = CameraControls.ACTION.TRUCK;
    this.navCamCtrl.mouseButtons.right = CameraControls.ACTION.TRUCK;

    window.addEventListener("mousedown", (event: MouseEvent) => {
      if (event.button === THREE.MOUSE.MIDDLE) {
        this.navCamCtrl.verticalDragToForward = false;
      }
    });
    // When middle mouse button is released, reset the flag for screen space panning
    window.addEventListener("mouseup", (event: MouseEvent) => {
      if (event.button === THREE.MOUSE.MIDDLE) {
        this.navCamCtrl.verticalDragToForward = true;
      }
    });
  }

  update(renderingTimeStep: number) {
    this.navCamCtrl.update(renderingTimeStep);
  }

  handleWindowResize() {
    this.navCam.aspect = window.innerWidth / window.innerHeight;
    this.navCam.updateProjectionMatrix();
    this.cineCam.aspect = window.innerWidth / window.innerHeight;
    this.cineCam.updateProjectionMatrix();
  }
}
