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

const geometry = new THREE.PlaneGeometry(100, 50);
const material = new THREE.MeshBasicMaterial({
  color: 0xfffffff,
});
const mesh = new THREE.Mesh(geometry, material);
geometry.translate(50, 0, 0);
//控制几何体缩放
geometry.scale(2, 1, 1);
geometry.center(); //重新中心点在原点
console.log("geometry.position", geometry.attributes.position);

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
