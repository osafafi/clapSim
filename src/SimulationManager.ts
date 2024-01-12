import * as THREE from "three";
import { Director } from "./Director";
import { Person } from "./ObjectManager";

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
    const p = this.director.objectManager.crowd.children[0] as Person;
    p.sound?.play();
  };

  simulate(elapsedTime: number) {
    if (this.simulationState === "play") {
      this.director.objectManager.simulateClaps(elapsedTime);
    }
  }
}

export type TSimulationState = "play" | "stop" | "pause";
