var container;
var camera, scene, renderer;
var group;
var startTime, mesh;
var controls;
init();
animate();
function init() {
  container = document.createElement("div");
  document.body.appendChild(container);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(
    20,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(0, 150, 500);
  scene.add(camera);

  controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 6.0;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [65, 83, 68];
  controls.addEventListener("change", render);

  var light = new THREE.PointLight(0xffffff, 0.8);
  camera.add(light);

  function addShape(points, color) {
    var geometry = new THREE.LatheGeometry(points, 500);
    var edges = new THREE.WireframeGeometry(geometry);
    mesh = new THREE.Mesh(edges, new THREE.MeshBasicMaterial({ color }));
    mesh.material.side = THREE.DoubleSide;
    scene.add(mesh);
  }

  var points = [
    { x: 15, y: 15 },
    { x: 15.702499999999999, y: 15.1125 },
    { x: 16.41, y: 15.25 },
    { x: 17.1225, y: 15.4125 },
    { x: 17.84, y: 15.6 },
    { x: 18.5625, y: 15.8125 },
    { x: 19.29, y: 16.05 },
    { x: 20.0225, y: 16.312499999999996 },
    { x: 20.76, y: 16.6 },
    { x: 21.502499999999998, y: 16.9125 },
    { x: 22.25, y: 17.25 },
    { x: 23.0025, y: 17.6125 },
    { x: 23.759999999999998, y: 18 },
    { x: 24.522499999999997, y: 18.412499999999998 },
    { x: 25.289999999999996, y: 18.849999999999998 },
    { x: 26.0625, y: 19.3125 },
    { x: 26.839999999999996, y: 19.799999999999997 },
    { x: 27.622500000000002, y: 20.3125 },
    { x: 28.41, y: 20.85 },
    { x: 29.202499999999997, y: 21.4125 },
    { x: 30.000000000000004, y: 22 },
    { x: 30.802500000000006, y: 22.6125 },
    { x: 31.610000000000003, y: 23.250000000000004 },
    { x: 32.42250000000001, y: 23.912500000000005 },
    { x: 33.24, y: 24.6 },
    { x: 34.06250000000001, y: 25.312500000000007 },
    { x: 34.890000000000015, y: 26.050000000000008 },
    { x: 35.72250000000001, y: 26.812500000000007 },
    { x: 36.56000000000001, y: 27.60000000000001 },
    { x: 37.40250000000001, y: 28.41250000000001 },
    { x: 38.25000000000001, y: 29.25000000000001 },
    { x: 39.10250000000002, y: 30.11250000000001 },
    { x: 39.960000000000015, y: 31.000000000000014 },
    { x: 40.82250000000001, y: 31.912500000000012 },
    { x: 41.69000000000002, y: 32.850000000000016 },
    { x: 42.562500000000014, y: 33.812500000000014 },
    { x: 43.44000000000001, y: 34.80000000000001 },
    { x: 44.32250000000002, y: 35.81250000000002 },
    { x: 45.21000000000002, y: 36.85000000000002 },
    { x: 46.10250000000002, y: 37.91250000000002 },
    { x: 47.000000000000014, y: 39.00000000000002 },
    { x: 47.90250000000002, y: 40.112500000000026 },
    { x: 48.810000000000024, y: 41.25000000000003 },
    { x: 49.722500000000025, y: 42.41250000000002 },
    { x: 50.64000000000003, y: 43.60000000000002 },
    { x: 51.56250000000003, y: 44.81250000000003 },
    { x: 52.49000000000002, y: 46.05000000000003 },
    { x: 53.42250000000003, y: 47.31250000000003 },
    { x: 54.36000000000003, y: 48.60000000000004 },
    { x: 55.30250000000003, y: 49.91250000000004 },
    { x: 56.25000000000002, y: 51.25000000000003 },
    { x: 57.20250000000002, y: 52.61250000000003 },
    { x: 58.160000000000025, y: 54.000000000000036 },
    { x: 59.12250000000003, y: 55.41250000000004 },
    { x: 60.09000000000003, y: 56.85000000000004 },
    { x: 61.06250000000002, y: 58.312500000000036 },
    { x: 62.040000000000035, y: 59.80000000000005 },
    { x: 63.02250000000002, y: 61.312500000000036 },
    { x: 64.01000000000003, y: 62.85000000000005 },
    { x: 65.00250000000003, y: 64.41250000000005 },
    { x: 66.00000000000003, y: 66.00000000000006 },
    { x: 67.00250000000003, y: 67.61250000000004 },
    { x: 68.01000000000003, y: 69.25000000000006 },
    { x: 69.02250000000004, y: 70.91250000000005 },
    { x: 70.04000000000005, y: 72.60000000000007 },
    { x: 71.06250000000003, y: 74.31250000000006 },
    { x: 72.09000000000003, y: 76.05000000000007 },
    { x: 73.12250000000003, y: 77.81250000000007 },
    { x: 74.16000000000004, y: 79.60000000000008 },
    { x: 75.20250000000004, y: 81.41250000000007 },
    { x: 76.25000000000004, y: 83.25000000000007 },
    { x: 77.30250000000004, y: 85.11250000000007 },
    { x: 78.36000000000004, y: 87.00000000000009 },
    { x: 79.42250000000004, y: 88.91250000000008 },
    { x: 80.49000000000004, y: 90.8500000000001 },
    { x: 81.56250000000004, y: 92.81250000000009 },
    { x: 82.64000000000004, y: 94.80000000000008 },
    { x: 83.72250000000005, y: 96.8125000000001 },
    { x: 84.81000000000004, y: 98.8500000000001 },
    { x: 85.90250000000005, y: 100.9125000000001 },
    { x: 87.00000000000006, y: 103.0000000000001 },
    { x: 88.10250000000006, y: 105.11250000000011 },
    { x: 89.21000000000005, y: 107.2500000000001 },
    { x: 90.32250000000006, y: 109.41250000000011 },
    { x: 91.44000000000005, y: 111.60000000000011 },
    { x: 92.56250000000007, y: 113.81250000000013 },
    { x: 93.69000000000007, y: 116.05000000000013 },
    { x: 94.82250000000006, y: 118.31250000000011 },
    { x: 95.96000000000006, y: 120.60000000000014 },
    { x: 97.10250000000006, y: 122.91250000000014 },
    { x: 98.25000000000007, y: 125.25000000000014 },
    { x: 99.40250000000007, y: 127.61250000000014 },
    { x: 100.56000000000006, y: 130.00000000000014 },
    { x: 101.72250000000007, y: 132.41250000000014 },
    { x: 102.89000000000007, y: 134.85000000000014 },
    { x: 104.06250000000007, y: 137.31250000000014 },
    { x: 105.24000000000008, y: 139.80000000000015 },
    { x: 106.42250000000007, y: 142.31250000000017 },
    { x: 107.61000000000007, y: 144.85000000000016 },
    { x: 108.80250000000008, y: 147.41250000000016 },
    { x: 110, y: 150 }
  ];
  points.map(elem => new THREE.Vector2(elem.x, elem.y));
  // var points = [];
  // for (var i = 0; i < 10; i++) {
  //   points.push(
  //     new THREE.Vector2(Math.sin(i * 0.2) * 10 + 5, (i - 5) * 2)
  //   );
  // }

  addShape(points, 0x4286f4);

  //
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  //
  startTime = Date.now();

  window.addEventListener("resize", onWindowResize, false);
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  controls.handleResize();
}

function animate() {
  var currentTime = Date.now();
  var time = (currentTime - startTime) / 1000;
  requestAnimationFrame(animate);
  // mesh.position.y = 0.8;
  // mesh.rotation.x = time * 0.5;
  // mesh.rotation.y = time * 0.2;
  // mesh.scale.setScalar(Math.cos(time) * 0.125 + 0.875);
  controls.update();
  renderer.render(scene, camera);
}
function render() {
  renderer.render(scene, camera);
}