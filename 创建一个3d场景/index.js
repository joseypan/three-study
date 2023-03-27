//
import * as THREE from "three";

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(10, 10, 10);

const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
