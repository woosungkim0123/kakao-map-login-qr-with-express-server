## 실행

터미널에서 package.json이 있는 위치에서 해당 명령어를 실행하면 됩니다.

### 개발

```json
// 개발 과정에서 nodemon을 활용한 실행 명령어
npm run dev
```

### 배포

```json
// 빌드
npm run build

// 시작
npm run start
```


## 설정

### Babel

Babel은 JavaScript 컴파일러.

최신 JavaScript 문법을 이전 버전의 JavaScript 문법으로 변환함으로써 최신 문법을 사용한 코드도 구버전의 브라우저에서 실행할 수 있게 해줍니다.

babel.config.json는 Babel의 설정 파일이고 presets은 어떤 변환을 수행해야 하는지 지정하는 배열입니다.

```json
{
  "presets": ["@babel/preset-env"]
}
```

### nodemon

nodemon은 파일 변경을 감지하고 자동으로 Node.js 애플리케이션을 재시작하는 도구입니다.

nodemon.json은 nodemon의 설정 파일이고 exec 속성은 nodemon이 파일 변경을 감지했을 때 실행할 명령어를 지정한 것입니다.

```json
{
  "exec": "babel-node src/bin/www.js"
}
```