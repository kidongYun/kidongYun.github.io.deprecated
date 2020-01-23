---
layout: post
title:  "Interpark - Let's configure the environment of Typescript + Graphql"
date:   2020-01-19 11:21:54 +0900
categories: interpark graphql typescript node
---

## Build The environment of _Typescript_ and _Graphql_

### 1. make the _'backend'_ directory.

> Let's make the _'backend'_ folder in to the your worksapce.

```
    workspace> mkdir backend
```

### 2. After changing the directory to _'backend'_ and Let's create the _'package.json'_ file using the _'npm init'_ command.

```
    workspace/backend>  npm init
```

<img src="/workspace/devlog/interpark/environment_typescript_graphql/res/1.png"/> 

> As you can see at the above, when you type the _'npm init'_, It's will ask a lot of question to you for configuring the node setting. Let's ignore all of questions. If you want you can modify this values after this setting.

### 3. install the node package related to the _'typescript'_ and _'graphql'_.

> We need to install a lot of node packages for building the architecture using the _'typescript'_ and _'graphql'_. Let's start to change your directory like the below command.

```
    workspace/backend>  workspace/backend> npm install graphql-to-typescript graphql-tools graphql-yoga nodemon ts-node tslint-config-prettier babel-runtime typescript
```

<img src="/workspace/devlog/interpark/environment_typescript_graphql/res/2.png"/>

> If your installation is successed, then you can see the _'package.json'_ like the above thing. Let's check the _'dependencies'_ part. It should have the all of the packages you install. <br><br> and then We will install the package only for the development environment. like the below.

```
    workspace/backend> npm install --save-dev @types/node
```

> the option _'--save-dev'_ means that you want to install the package for the development envrionment not production. and _'package.json'_ also has this package differently with another.

<img src="/workspace/devlog/interpark/environment_typescript_graphql/res/3.png"/>

### 4. Let's understand the role of the each packages.

#### _'graphql-to-typescript'_

> graphql actually can be written a lot of the languages. that is it's an indepedent thing from any languages. so if you want use this with the _'typescript'_ then you should install the _'graphql-to-typescript'_ package. It will help you.

#### _'graphql-tools'_

> From the management perspective, the code related to schema of _'graphql'_  should be separated. This package can help for this.

#### _'graphql-yoga'_

> It's like the _'create-react-app'_ in the _'React'_. If you use this package, You can configure the graphql thing more easiler than it's not. Actually It include the below things.

```

    express                 : It's the basic web server from the node framework.

    apollo-server           : It's the graphql server package occurred from the Apollo.

    graphql.js              : It's core engine of the graphql function.

    graphql-tools           : I already introduced about this package. 

    graphql-playground      : It's the IDE based the Web. It' like the postman so you can test the graphql query or mutation.

```

#### _'nodemon'_

> When your project has any change, then this _'nodemon'_ package will update your server with this change.

#### _'babel-runtime'_

> _'babel'_ basically is the tool to translate the JS language from the ES6/ES7 syntax to more lower version thing. when you want to use the ES6/ES7 at the IE thing It's really useful. 

#### _'ts-node'_

> You gotta understand the fact that the typescript will transpile to the javascript when you execute eventually. So whenever you change the typescript code you should transpile the changed typescript file using the _'tsc'_ program. but if you use this package It will help you automatically. and this package use the code uploaded the memory so It's more faster than it's not.

#### _'tslint-config-prettier'_

> _'tslint'_ is the static analysis tool for checking whether you keep the standard rule of the typescript or not and prettier is the package to arrange the code.

#### _'typescript'_

> It's like the _'jdk'_ of the _'java language'_.

### 5. Create the _'.gitignore'_ for excepting the _'node_module'_ folder.

> As the user of the dropbox service, I really dislike the _'node_modules'_ thing. because It has really a lot of the files. If you upload this folder to the git remote repository, It will be really heavy. Let's follow the below.

```
    workspace/backend> touch .gitignore
```

#### .gitignore

```
    node_modules
```

<img src="/workspace/devlog/interpark/environment_typescript_graphql/res/4.png"/>

> then the _'node_modules'_ folder will not upload to your remote repository.

### 5. Let's create and configure the environment setting files of the typescript and graphql

```

    workspace/backend> touch nodemon.json
    workspace/backend> touch tsconfig.json
    workspace/backend> touch tslint.json
    workspace/backend>touch .babelrc

```

> Let's create the 4 files at the _'backend'_ folder.

#### nodemon.json

```json

{
    "ext": "ts graphql"
} 

```

> The above code means the nodemon will update the server whenever modifying the code had the extension _'ts'_, or _'graphql'_.

#### tsconfig.json

```json

{
    "compilerOptions": {
      "baseUrl": ".",
      "module": "commonjs",
      "target": "es5",
      "lib": ["es6", "dom", "esnext.asynciterable"],
      "sourceMap": true,
      "allowJs": true,
      "moduleResolution": "node",
      "rootDir": "src",
      "forceConsistentCasingInFileNames": true,
      "noImplicitReturns": true,
      "noImplicitThis": true,
      "noImplicitAny": false,
      "strictNullChecks": true,
      "suppressImplicitAnyIndexErrors": true,
      "noUnusedLocals": true,
      "esModuleInterop": true,
      "skipLibCheck": true,
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true
    },
    "exclude": [
      "node_modules",
      "build",
      "scripts",
      "acceptance-tests",
      "webpack",
      "jest",
      "src/setupTests.ts"
    ]
}

```

> I think it has the contents related to the setting information used when you transpile the typecript to javascript. But i don't know detail of it.

#### tslint.json

```json

{
    "extends": ["tslint:recommended", "tslint-config-prettier"],
    "linterOptions": {
      "exclude": ["config/**/*.js", "node_modules/**/*."]
    },
    "rules": {
      "no-console": false,
      "member-access": false,
      "object-literal-sort-keys": false,
      "ordered-imports": true,
      "interface-name": false,
      "strict-null-checks": false
    },
    "rulesDirectory": []
}

```

#### .babelrc

```json

{
  "presets": ["@babel/preset-env"]
}

```

### 6. Let's excute the typescript + graphql server.

> We should make the _'index.ts'_ file for the perspective of entry point.

```

    workspace/backend> mkdir src
    workspace/backend/src> touch index.ts

```

#### index.ts

```ts

  import { GraphQLServer } from "graphql-yoga"
  // graphql-yoga 패키지를 GraphQLServer 라는 이름으로 가져온다.

  const typeDefs = `
    type Query {
      sayHello : String!
    }
  `
  // graphql server를 실행시키기 위해 필요한 파라미터 둘 중 하나 'typeDefs' 정의
  // 'typeDefs'는 인자값과 리턴되는 값의 타입을 지정한다. 
  // 추가적으로 'String!'에서 !는 null을 허용하지 않음을 의미한다. 

  const resolvers = {
    Query : {
      sayHello: () => "Hi there :0)"
    }
  }
  // graphql server를 실행시키기 위해 필요한 파라미터 둘 중 하나 'resolvers' 정의
  // 'resolvers'는 비지니스 로직이 실제로 들어가는 부분이다.

  const server = new GraphQLServer({ typeDefs, resolvers });
  // 'graphql-yoga'를 import한 GraphQLServer 객체와 위에 정의한 2개의 파라미터를 활용해 server 객체를 생성한다.
  // { } 이 표시는 왜 있을까? 한 객체로 파라미터를 전달한다는 의미일까?

  server.start(() => console.log('My first GraphQL Server is running on localhost:4000'))
  // 실제 서버를 실행시키는 코드이다.

```

> The node project usually use the script option when you execute that project. so for this, Let's start to modify the _'package.json'_

#### package.json

```json

  ...

  "scripts": {
      "dev": "cd src && nodemon --exec ts-node index.ts -e ts, graphql"
  }

  ...

```

> the below is the whole code of the _'package.json'_ file.

```json

{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "cd src && nodemon --exec ts-node index.ts -e ts, graphql"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-runtime": "^6.26.0",
    "graphql-to-typescript": "^0.1.2",
    "graphql-tools": "^4.0.6",
    "graphql-yoga": "^1.18.3",
    "nodemon": "^2.0.2",
    "ts-node": "^8.6.2",
    "tslint-config-prettier": "^1.18.0",
    "typescript": "^3.7.4"
  },
  "devDependencies": {
    "@types/node": "^13.1.7"
  }

```

> the script actually mean the below.

```

    1. change the 'src' directory.

    2. transpile the 'index.ts' file using the 'ts-node'

    3. execute the server with the 'nodemon' 

```

> execute the _'dev'_ srcipt using the below command

```

    workspace/backend> yarn dev

```

<img src="/workspace/devlog/interpark/environment_typescript_graphql/res/7.png"/>