/**
 * Dependency-free WebGL renderer for the hero sculpture: a ray-marched,
 * iridescent organic form (displaced core fused with a tilted ring) plus a
 * soft halo. Only pixels inside a bounding sphere are marched, which keeps
 * the full-viewport canvas cheap.
 */

const VERTEX = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uCenter;
uniform float uScale;
uniform float uFade;
uniform vec3 uColA;
uniform vec3 uColB;
uniform vec3 uColC;
uniform float uLight;

mat2 rot(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float map(vec3 p) {
  float t = uTime;
  p.xz = rot(t * 0.16 + uPointer.x * 0.55) * p.xz;
  p.yz = rot(0.32 - uPointer.y * 0.4) * p.yz;

  // Organic core: a sphere with slow, layered sinusoidal displacement.
  float core = length(p) - 0.9;
  core += 0.085 * sin(p.x * 3.3 + t * 0.8) * sin(p.y * 2.8 - t * 0.65) * sin(p.z * 3.1 + t * 0.55);
  core += 0.03 * sin(p.y * 7.0 + t * 1.1);

  // Tilted ring that melts into the core.
  vec3 r = p;
  r.xy = rot(0.95) * r.xy;
  r.xz = rot(t * 0.1) * r.xz;
  float ring = length(vec2(length(r.xz) - 1.3, r.y)) - 0.075;

  // Thin counter-tilted filament for depth.
  vec3 f = p;
  f.yz = rot(1.2) * f.yz;
  f.xy = rot(-0.4) * f.xy;
  float filament = length(vec2(length(f.xz) - 1.56, f.y)) - 0.024;

  return min(smin(core, ring, 0.34), filament);
}

vec3 calcNormal(vec3 p) {
  vec2 e = vec2(1.0, -1.0) * 0.0015;
  return normalize(
    e.xyy * map(p + e.xyy) +
    e.yyx * map(p + e.yyx) +
    e.yxy * map(p + e.yxy) +
    e.xxx * map(p + e.xxx)
  );
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  uv = (uv - uCenter) / uScale;

  vec3 ro = vec3(0.0, 0.0, 4.0);
  vec3 rd = normalize(vec3(uv, -1.6));

  float b = dot(ro, rd);
  float closest = sqrt(max(dot(ro, ro) - b * b, 0.0));
  float halo = exp(-max(closest - 0.85, 0.0) * 2.4);

  vec3 col = vec3(0.0);
  float alpha = 0.0;

  float radius = 1.75;
  float h = b * b - (dot(ro, ro) - radius * radius);
  if (h > 0.0) {
    h = sqrt(h);
    float t = max(-b - h, 0.0);
    float tMax = -b + h;
    bool hit = false;
    float minD = 1e3;
    for (int i = 0; i < 72; i++) {
      float d = map(ro + rd * t);
      minD = min(minD, d);
      if (d < 0.0015) {
        hit = true;
        break;
      }
      t += d * 0.85;
      if (t > tMax) break;
    }

    // Near misses fade in as a soft rim: anti-aliases the silhouette.
    if (!hit) {
      float edge = 1.0 - smoothstep(0.0, 0.03, minD);
      col = mix(uColB, uColC, 0.55);
      alpha = edge * 0.7;
    }

    if (hit) {
      vec3 p = ro + rd * t;
      vec3 n = calcNormal(p);
      vec3 v = -rd;
      vec3 l = normalize(vec3(uPointer.x * 2.4 + 1.3, uPointer.y * 2.0 + 1.5, 2.4));

      float diff = clamp(dot(n, l), 0.0, 1.0);
      float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.4);
      float spec = pow(clamp(dot(reflect(-l, n), v), 0.0, 1.0), 56.0);
      float back = pow(clamp(dot(n, normalize(vec3(-1.0, -0.5, -0.8))), 0.0, 1.0), 2.0);

      float band = 0.5 + 0.5 * sin(dot(n, vec3(2.2, 1.6, 1.1)) * 2.3 + uTime * 0.3);
      vec3 irid = mix(uColA, uColB, band);
      irid = mix(irid, uColC, smoothstep(0.3, 1.0, fres));

      vec3 core = mix(vec3(0.035, 0.025, 0.07), vec3(0.42, 0.38, 0.62), uLight);
      col = core + irid * (0.16 + diff * 0.55) + irid * fres * 1.15 + uColB * back * 0.3;
      col += vec3(1.0) * spec * 0.6;
      col = clamp(col, 0.0, 1.0);
      alpha = 1.0;
    }
  }

  vec3 haloCol = mix(uColA, uColB, smoothstep(-1.2, 1.2, uv.x - uv.y * 0.5));
  float haloA = halo * mix(0.42, 0.26, uLight);

  vec3 outCol = col * alpha + haloCol * haloA * (1.0 - alpha);
  float outA = alpha + haloA * (1.0 - alpha);
  gl_FragColor = vec4(outCol, outA) * uFade;
}
`;

export type SceneFrame = {
  time: number;
  pointer: [number, number];
  /** Object centre in viewport-height units, origin at the canvas centre. */
  center: [number, number];
  scale: number;
  fade: number;
};

export type HeroScene = {
  resize(width: number, height: number): void;
  setTheme(light: boolean): void;
  render(frame: SceneFrame): void;
  destroy(): void;
};

const PALETTES = {
  dark: {
    a: [0.486, 0.227, 0.929],
    b: [0.231, 0.51, 0.965],
    c: [0.941, 0.671, 0.988],
    light: 0,
  },
  light: {
    a: [0.486, 0.227, 0.929],
    b: [0.145, 0.388, 0.922],
    c: [0.753, 0.518, 0.988],
    light: 1,
  },
} as const;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

/** Returns null when WebGL or the shader is unavailable; callers keep the CSS fallback. */
export function createHeroScene(canvas: HTMLCanvasElement): HeroScene | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  if (!gl) return null;

  const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
  if (!vs || !fs) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  // One oversized triangle covers the viewport.
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const u = (name: string) => gl.getUniformLocation(program, name);
  const uniforms = {
    res: u("uRes"),
    time: u("uTime"),
    pointer: u("uPointer"),
    center: u("uCenter"),
    scale: u("uScale"),
    fade: u("uFade"),
    colA: u("uColA"),
    colB: u("uColB"),
    colC: u("uColC"),
    light: u("uLight"),
  };

  gl.clearColor(0, 0, 0, 0);

  return {
    resize(width, height) {
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms.res, width, height);
    },
    setTheme(light) {
      const palette = light ? PALETTES.light : PALETTES.dark;
      gl.uniform3fv(uniforms.colA, palette.a);
      gl.uniform3fv(uniforms.colB, palette.b);
      gl.uniform3fv(uniforms.colC, palette.c);
      gl.uniform1f(uniforms.light, palette.light);
    },
    render(frame) {
      gl.uniform1f(uniforms.time, frame.time);
      gl.uniform2f(uniforms.pointer, frame.pointer[0], frame.pointer[1]);
      gl.uniform2f(uniforms.center, frame.center[0], frame.center[1]);
      gl.uniform1f(uniforms.scale, frame.scale);
      gl.uniform1f(uniforms.fade, frame.fade);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    destroy() {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}
