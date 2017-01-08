
$(function() {
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 500);
  var renderer = new THREE.WebGLRenderer({antialias:true});
  
//backgroundColor is black
  renderer.setClearColor(0xdddddd);
  //size of the renderer it assigns the size of window when loaded
  renderer.setSize(window.innerWidth, window.innerHeight);

  //enable  shadows in rendering
  renderer.shadowMap.Enabled=true;
  //smooth produced shadows
  renderer.shadowMapSoft=true;
  
  
//bazw ena systhma axonwn dhladh apo poy tha metraei to 0,0,0
  var axis = new THREE.AxisHelper(10);
  scene.add(axis);

  //proairetiko vohthikiko grid
  var grid=new THREE.GridHelper(50,5);
  var color=new THREE.Color("rgb(255,0,0)");
  grid.setColors(color,0x000000);
  scene.add(grid);
  
  //add plane
  var planeGeometry=new THREE.PlaneGeometry(50,50);
  var planeMaterial=new THREE.MeshLambertMaterial({
	  color:0xa0adaf,
	  side: THREE.DoubleSide
	  });
  var plane=new THREE.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x = -Math.PI/2; //-90 degrees around the xaxis 
	//IMPORTANT, draw on both sides 
    //plane.doubleSided = true; 
  plane.receiveShadow=true;
  scene.add(plane);
  
  //dhmiourgw to shader pou 8elw gia ton kyvo
  var shader0={
	  vertexShader:document.getElementById("vs0").textContent,
	  fragmentShader:document.getElementById("fs0").textContent
  }
  //dhmiourgw to material pou 8a exei to shader kai 8a xrhsimopoihsw ayto to material gia to cube mesh
  var shaderMat0=new THREE.ShaderMaterial(shader0);
  
  var shader1={
	  uniforms:{
		  color_dark: {
			  type: "v4",
			  value:new THREE.Vector4(0.3,0.2,0.5,1.0)
		  }
	  },
	  vertexShader:document.getElementById("vs1").textContent,
	  fragmentShader:document.getElementById("fs1").textContent
  }
  var shaderMat1=new THREE.ShaderMaterial(shader1);
  
  //bazoyme ta stoixeia ths gewmetrias kai to material kai meta ta kanoyme ena antikeimeno Mesh 
  var torGeometry = new THREE.TorusKnotGeometry( 3, 1, 64, 64); 
  var torMaterial = new THREE.MeshLambertMaterial({
	  color: 0xffff00
	  });
  var torusKnot = new THREE.Mesh(torGeometry,  shaderMat1);
  
  torusKnot.position.x = -15;
  torusKnot.position.y = 6;
  torusKnot.position.z = 2.5;
  torusKnot.castShadow = true;
  scene.add( torusKnot );
  
  //bazoyme ta stoixeia ths gewmetrias kai to material kai meta ta kanoyme ena antikeimeno Mesh 
  var cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
  
  
  
  //diaforetiko material
  var cubeMaterial = new THREE.MeshLambertMaterial({
	  color: 0xff0000
	  });
	  
  //var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  var cube = new THREE.Mesh(cubeGeometry, shaderMat0);
  //poy xekinaei to antikeimeno - h 8esh toy	
  cube.position.x = 2.5;
  cube.position.y = 2.5;
  cube.position.z = 2.5;
  cube.castShadow=true;
  //to prosthetw sthn skhnh
  scene.add(cube);

var SPEED0 = 0.01;
var SPEED1 = 0.02;

function rotateCube() {
    cube.rotation.x -= SPEED0 * 2;
    cube.rotation.y -= SPEED0;
    cube.rotation.z -= SPEED0 * 3;
}

function rotateTorus() {
      torusKnot.rotation.x -= SPEED1 * 3;
      torusKnot.rotation.y -= SPEED1 * 2;
      torusKnot.rotation.z -= SPEED1 * 3;
}
  
  
  var spotLight=new THREE.SpotLight(0xffffff);
  spotLight.position.set(10,10,15);
  spotLight.castShadow=true;
  scene.add(spotLight);
  
   //h thesh ths kameras
  camera.position.x = 60;
  camera.position.y = 30;
  camera.position.z = 60;
  //h kamera koitaei th skhnh= new
  camera.lookAt(scene.position);

  // Add OrbitControls so that we can pan around with the mouse.
  var controls = new THREE.OrbitControls(camera);
  controls.addEventListener( 'change', render );
  
 
   //rotate ton kyvo gyrw apo ton x axona
   function animate(){
	  render();
	  //create a loop that causes the renderer to draw the scene 60 times per second.
	  requestAnimationFrame(animate);
	  rotateCube();
	  rotateTorus();
	  stats.update();  

	  //controls.update();
      renderer.render(scene, camera);
  }
  
  function render() {
        //prepei na kalesw th function
  renderer.render(scene, camera);
    }
  
  
    //prepei na kalesw th function
  renderer.render(scene, camera);
  $("#webGL-container").append(renderer.domElement);
 /*stats*/
        var stats = new Stats();        
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';     
        $("#webGL-container").append( stats.domElement );
  
  //on document load and if the document(the page) resizes
  $(window).resize(function(){


        SCREEN_WIDTH = window.innerWidth;
        SCREEN_HEIGHT = window.innerHeight;

        camera.aspect = SCREEN_WIDTH / SCREEN_HEIGHT;
        camera.updateProjectionMatrix();

        renderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
		});
  
  
  
  animate();
 
  
  
});