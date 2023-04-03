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

const vertices = new Float32Array([0, 0, 0, 10, 10, 0, 10, 0, 10, 0, 10, 10]);
const attributes = new THREE.BufferAttribute(vertices, 3);
const pointsGeometry = new THREE.BufferGeometry();
pointsGeometry.attributes.position = attributes;
const pointsMaterial = new THREE.PointsMaterial({
  color: 0xfffff,
  size: 10,
});
const points = new THREE.Points(pointsGeometry, pointsMaterial);
scene.add(points);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
