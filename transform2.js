

const fragmentShader2 = 
`
precision mediump float;
uniform sampler2D u_image;
uniform vec2 topLeft;
uniform vec2 topRight;
uniform vec2 botRight;
uniform vec2 botLeft;
uniform vec2 newTopLeft;
uniform vec2 newTopRight;
uniform vec2 newBotRight;
uniform vec2 newBotLeft;
varying vec2 v_texCoord;
varying float v_progress;

void main() {
  mat3 a = squareQuad(topLeft.x, topLeft.y, topRight.x, topRight.y, botRight.x, botRight.y, botLeft.x, botLeft.y);
  mat3 b = squareQuad(newTopLeft.x, newTopLeft.y, newTopRight.x, newTopRight.y, newBotRight.x, newBotRight.y, newBotLeft.x, newBotLeft.y);
  mat3 inverse_a = inverse(a);
  mat3 finalWarp = inverse_a * b;
  mat3 matrixWarp(a);
}

mat3 squareQuad(float x0, float y0, float x1, float y1, float x2, float y2,float x2, float y2) {  
  float dx1 = x1 - x2;
  float dy1 = y1 - y2;
  float dx2 = x3 - x2;
  float dy2 = y3 - y2;
  float dx3 = x0 - x1 + x2 - x3;
  float dy3 = y0 - y1 + y2 - y3;
  float det = dx1*dy2 - dx2*dy1;
  float a = (dx3*dy2 - dx2*dy3) / det;
  float b = (dx1*dy3 - dx3*dy1) / det;

  return mat3(x1 - x0 + a*x1, y1 - y0 + a*y1, a,
  x3 - x0 + b*x3, y3 - y0 + b*y3, b,
  x0, y0, 1);
}

mat3 inverse(mat3 m) {
  float a = m[0], b = m[1], c = m[2];
  float d = m[3], e = m[4], f = m[5];
  float g = m[6], h = m[7], i = m[8];
  float det = a*e*i - a*f*h - b*d*i + b*f*g + c*d*h - c*e*g;
  return mat3( 
  (e*i - f*h) / det, (c*h - b*i) / det, (b*f - c*e) / det,
  (f*g - d*i) / det, (a*i - c*g) / det, (c*d - a*f) / det,
  (d*h - e*g) / det, (b*g - a*h) / det, (a*e - b*d) / det
  );
`
