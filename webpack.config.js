const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 앱의 시작점
  entry: './src/index.tsx',

  // 번들된 파일의 출력 설정
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // 빌드 시 마다 dist 폴더를 정리
  },

  // 모듈 처리 방식 설정
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/, // .ts, .tsx 확장자 추가
        exclude: /node_modules/,
        use: {
          loader: 'swc-loader', // swc-loader를 사용해 컴파일
        },
      },
      {
        test: /\.css$/, // .css 파일에 대해
        use: ['style-loader', 'css-loader'], // style-loader, css-loader를 순서대로 적용
      },
    ],
  },

  // 플러그인 설정
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // public/index.html을 템플릿으로 사용
    }),
  ],

  // 개발 서버 설정
  devServer: {
    port: 3000,
    hot: true, // Hot Module Replacement 활성화
    open: true, // 서버 실행 시 브라우저 자동 열기
  },

  // import 시 확장자 생략 가능하도록 설정
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // 확장자 추가
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
