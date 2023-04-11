import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(0, 0, 0);
camera.lookAt(500, 0, 0);

const axesHelper = new THREE.AxesHelper(80);
scene.add(axesHelper);

// 创建立体纹理加载器
const cubeTexLoader = new THREE.CubeTextureLoader();
const cubeTexture = cubeTexLoader.load([
  "../models/texture/px.jpg",
  "../models/texture/nx.jpg",
  "../models/texture/py.jpg",
  "../models/texture/ny.jpg",
  "../models/texture/pz.jpg",
  "../models/texture/nz.jpg",
]);
cubeTexture.encoding = THREE.sRGBEncoding;

const geometry = new THREE.BoxGeometry(500, 500, 500);
const material = new THREE.MeshStandardMaterial({
  metalness: 0.5,
  roughness: 0,
  envMap: cubeTexture,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const gui = new GUI();
gui.add(material, "metalness", 0, 1).name("金属度").step(0.1);
gui.add(material, "roughness", 0, 1).name("粗糙度").step(0.1);

// 添加灯光
const pointLight = new THREE.PointLight(0xffffff, 0.6);
scene.add(pointLight);

// 一定要添加灯光，不然什么也看不见
// 用平行光来模拟太阳光效果
// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight.position.set(200, 200, 200);
// directionalLight.target = mesh;
// scene.add(directionalLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
  mesh.rotateY(0.01);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(500, 0, 0);
controls.update();
document.body.appendChild(renderer.domElement);
