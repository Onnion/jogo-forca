/* GULPFILE PATHS */
const { resolve } = require('path');

const ROOT_PATH = resolve(__dirname);
const CURRENT_PATH = '.';
const INIT_PATH = `${ ROOT_PATH }/src/app`;
const DEST_PATH = `${ ROOT_PATH }/src/dist`;

const PATHS = {
  sass: {
    origin: `${ INIT_PATH }/assets/scss/style.scss`,
    dist: `${ DEST_PATH }/assets/css`,
    watch: [
      `${ INIT_PATH }/assets/scss/*.scss`,
      `${ INIT_PATH }/assets/scss/**/*.scss`,
      `${ INIT_PATH }/modules/**/*.scss`,
    ],
  },
  html: {
    origin: `${ INIT_PATH }/modules/pages/**/*.html`,
    dist: DEST_PATH,
    include: [
      `${ INIT_PATH }/modules/layouts/**/*.html`,
      `${ INIT_PATH }/modules/components/**/*.html`,
      `${ INIT_PATH }/modules/pages/**/*.html`,
    ],
  },
  images: {
    origin: [`${ INIT_PATH }/assets/images/**/*.*`],
    dist: `${ DEST_PATH }/assets/images`,
  },
  fonts: {
    origin: [`${ INIT_PATH }/assets/fonts/**/*.*`],
    dist: `${ DEST_PATH }/assets/fonts`,
  },
  libs: {
    origin: [
      'node_modules/jquery/dist/jquery.js',
      `${ INIT_PATH }/assets/js/libs/**/**.js`
    ]
  },
  plugins: {
    origin: [
      `${ INIT_PATH }/assets/js/plugins/**/**.js`
    ]
  },
  scripts: {
    origin: [
      `${ INIT_PATH }/modules/services/**/*.js`,
      `${ INIT_PATH }/modules/components/**/*.js`,
      `${ INIT_PATH }/modules/layouts/**/*.js`,
      `!${ INIT_PATH }/modules/**/*.test.js`
    ],
    dist: `${ DEST_PATH }/assets/js`,
  }
};

module.exports = {
  ROOT_PATH,
  CURRENT_PATH,
  INIT_PATH,
  DEST_PATH,
  PATHS,
};
