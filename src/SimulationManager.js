"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimulationManager = void 0;
const THREE = __importStar(require("three"));
class SimulationManager extends THREE.Object3D {
    constructor(director) {
        super();
        this.play = () => {
            this.simulationState = "play";
        };
        this.stop = () => {
            var _a;
            this.simulationState = "stop";
            const p = this.director.objectManager.crowd.children[0];
            (_a = p.sound) === null || _a === void 0 ? void 0 : _a.play();
        };
        this.director = director;
        this.simulationState = "stop";
    }
    init() { }
    setSimState(state) {
        this.simulationState = state;
    }
    simulate(elapsedTime) {
        if (this.simulationState === "play") {
            this.director.objectManager.simulateClaps(elapsedTime);
        }
    }
}
exports.SimulationManager = SimulationManager;
