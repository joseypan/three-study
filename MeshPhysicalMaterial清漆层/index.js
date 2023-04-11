import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  3000
);
camera.position.set(100, 100, 200);
camera.lookAt(0, 0, 0);

const axesHelper = new THREE.AxesHelper(80);
scene.add(axesHelper);

// const geometry = new THREE.SphereGeometry(50, 32, 16);
// const material = new THREE.MeshPhysicalMaterial({
//   color: 0xffff00,
//   metalness: 0.5,
//   roughness: 0.5,
//   clearcoat: 0.5,
//   clearcoatRoughness: 0.5,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

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
const glassList = [
  "玻璃01",
  "玻璃02",
  "玻璃03",
  "玻璃04",
  "玻璃05",
  "玻璃06",
  "玻璃07",
];
const gltfLoader = new GLTFLoader();
gltfLoader.load("../models/轿车.glb", (model) => {
  console.log("model", model);
  const dressMesh = model.scene.getObjectByName("外壳01");
  dressMesh.material = new THREE.MeshPhysicalMaterial({
    color: dressMesh.material.color,
    metalness: 0.9,
    roughness: 0.5,
    envMap: cubeTexture,
    envMapIntensity: 2.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  });
  glassList.forEach((item) => {
    const glassMesh = model.scene.getObjectByName(item);
    glassMesh.material = new THREE.MeshPhysicalMaterial({
      metalness: 0,
      roughness: 0,
      envMap: cubeTexture,
      envMapIntensity: 1,
      transmission: 1,
      ior: 1.5,
    });
  });
  scene.add(model.scene);
});

const gui = new GUI();
// gui.add(material, "metalness", 0, 1).name("金属度").step(0.1);
// gui.add(material, "roughness", 0, 1).name("粗糙度").step(0.1);
// gui.add(material, "clearcoat", 0, 1).name("清漆").step(0.1);
// gui.add(material, "clearcoatRoughness", 0, 1).name("清漆粗糙度").step(0.1);

// 添加灯光
// const ambientLight = new THREE.AmbientLight("0xffffff", 1);
// scene.add(ambientLight);

// 一定要添加灯光，不然什么也看不见
// 用平行光来模拟太阳光效果;
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(300, 300, 300);
// directionalLight.target = mesh;
scene.add(directionalLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);
