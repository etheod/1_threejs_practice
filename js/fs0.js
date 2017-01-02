$(function() {
	//FRAGMENT SHADER
	varying vec4 col; //prepei na einai to idio me tou vertex
	void main(){
		gl_FragColor=col;
	}
}