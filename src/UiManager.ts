//UiManager.ts

import * as THREE from "three";
import { Director } from "./Director";
import Stats from "stats.js";
import dat from "dat.gui";

export class UiManager extends THREE.Object3D {
  director: Director;
  stats: Stats;
  gui: dat.GUI;

  constructor(director: Director) {
    super();
    this.director = director;

    // Stats
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);

    // dat.GUI
    this.gui = new dat.GUI();
    // Move the GUI to a new position
    this.gui.domElement.style.position = "absolute";
    this.gui.domElement.style.zIndex = "5";
    this.gui.domElement.style.opacity = "0.8";
    this.gui.domElement.style.top = "0px";
    this.gui.domElement.style.right = "0px";
    document.body.appendChild(this.gui.domElement);

    this.init();
  }

  init() {
    // Camera Folder
    const cameraFolder = this.gui.addFolder("Cine Camera");
    cameraFolder.add(
      this.director.cameraManager.cineCam.position,
      "x",
      -100,
      100
    );
    cameraFolder.add(
      this.director.cameraManager.cineCam.position,
      "y",
      -100,
      100
    );
    cameraFolder.add(
      this.director.cameraManager.cineCam.position,
      "z",
      -100,
      100
    );

    // Debug folder
    const debugFolder = this.gui.addFolder("Debug");
    debugFolder.add({ DebugLog: this.debugLog }, "DebugLog");
    debugFolder.open();

    //
    const simCtrl = this.gui.addFolder("Simulation Control");
    // Add buttons to the GUI
    simCtrl.add({ Play: this.director.simulationManager.play }, "Play");
    simCtrl.add({ Stop: this.director.simulationManager.stop }, "Stop");
    simCtrl.add(
      {
        Reset: () => {
          this.director.objectManager.resetCps();
          this.director.simulationManager.stop();
          this.director.renderingClock = new THREE.Clock();
        },
      },
      "Reset"
    );
    simCtrl.open();
  }

  debugLog = () => {
    console.log(this.director);
  };
}
