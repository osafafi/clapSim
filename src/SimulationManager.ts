import * as THREE from "three";
import { Director } from "./Director";

export class SimulationManager extends THREE.Object3D {
  director: Director;
  simulationState: TSimulationState;

  constructor(director: Director) {
    super();
    this.director = director;
    this.simulationState = "stop";
  }

  init() {}

  setSimState(state: TSimulationState) {
    this.simulationState = state;
  }

  play = () => {
    this.simulationState = "play";
  };
  stop = () => {
    this.simulationState = "stop";
  };

  simulate(elapsedTime: number) {
    if (this.simulationState === "play") {
      this.director.objectManager.simulateClaps(elapsedTime);
    }
  }
}

export type TSimulationState = "play" | "stop" | "pause";
