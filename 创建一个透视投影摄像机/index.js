import * as THREE from "three";

const width = window.innerWidth;
const height = window.innerHeight;

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);

camera.position.set(200, 200, 200);

camera.lookAt(0, 0, 0);
