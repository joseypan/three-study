import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const vertices = new Float32Array([
  0, 0, 0, 10, 10, 0, 15, 20, 0, 15, 0, 20, 10, 0, 10, 0, 15, 20, 0, 10, 10,
]);
const geometry = new THREE.BufferGeometry();
const attributes = new THREE.BufferAttribute(vertices, 3);
geometry.attributes.position = attributes;
const lineMaterial = new THREE.LineBasicMaterial({
  color: 0xffffff,
});
//线条（首尾不相接）
// const line = new THREE.Line(geometry, lineMaterial);
// 环线（首尾相接）
// const line = new THREE.LineLoop(geometry, lineMaterial);
// 线段
const line = new THREE.LineSegments(geometry, lineMaterial);
scene.add(line);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
