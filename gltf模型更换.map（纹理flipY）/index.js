import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
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

// requestAnimationFrame(moveTexture);
const loader = new GLTFLoader();
loader.load("../models/手机模型.glb", (obj) => {
  scene.add(obj.scene);
  console.log(obj.scene);
  const model = obj.scene.children[0];
  const texture = new THREE.TextureLoader().load("../models/texture/黑色.png"); //直接加载会发现贴图是倒过来的
  texture.encoding = THREE.sRGBEncoding;
  texture.flipY = false;
  model.material.map = texture;
});
renderer.outputEncoding = THREE.sRGBEncoding; //保持模型渲染编码方式与渲染器渲染方式一致，才没有色差

// 添加灯光
const ambientLight = new THREE.AmbientLight("0xffffff", 1);
scene.add(ambientLight);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();
// 创建orbitcontrols
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", (event) => {
  console.log("change", camera.position); //用来记录相机位置的
});

document.body.appendChild(renderer.domElement);
