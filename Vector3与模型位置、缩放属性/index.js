import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
const width = window.innerWidth;
const height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({
  antialias: true,
});
renderer.setSize(width, height);

const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(100, 100, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(100, 100, 100);
const material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
});
// const group = new THREE.Group();
// const mesh1 = new THREE.Mesh(geometry, material);
// const mesh2 = new THREE.Mesh(geometry, material);
// mesh2.translateX(125);
// // group.add(mesh1);
// // group.add(mesh2);
// // 也可以改为这种写法
// group.add(mesh1, mesh2);

// group.translateY(100);
// group.scale.set(0.2, 0.2, 0.2);
// group.rotateY(Math.PI / 6);

// scene.add(group);
// console.log("查看group的子对象", group.children);
// 除了使用Group也可以直接使用Object3D
const obj = new THREE.Object3D();
const mesh1 = new THREE.Mesh(geometry, material);
const mesh2 = new THREE.Mesh(geometry, material);
mesh2.translateX(125);
mesh1.add(mesh2);
obj.add(mesh1);
obj.translateY(100);
obj.scale.set(0.2, 0.2, 0.2);
obj.rotateY(Math.PI / 6);
scene.add(obj);

const controls = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};

document.body.appendChild(renderer.domElement);
render();
