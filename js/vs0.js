$(function() {
	//VERTEX SHADER
	varying vec4 col;
	void main(){
	col=vec4(0.0,1.0,0.0,1.0);
	vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * mvPosition;
	}
}