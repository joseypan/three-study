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

const vertices = new Float32Array([0, 0, 0, 80, 0, 0, 80, 80, 0, 0, 80, 0]);
const indexes = new Uint16Array([0, 1, 2, 0, 2, 3]);
const attributes = new THREE.BufferAttribute(vertices, 3);
const indexAttributes = new THREE.BufferAttribute(indexes, 1);
const geometry = new THREE.BufferGeometry();
geometry.attributes.position = attributes;
geometry.index = indexAttributes;
const material = new THREE.MeshLambertMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const normals = new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1]);
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
