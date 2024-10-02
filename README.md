# Consdev

```sh
npm install consdev
```

## Usage

### NodeJS
```js
const Consdev = new require('consdev');
```

### 
```js
const _consdev = new Consdev();
const Consdev = new _consdev;
```

```js
Consdev.success('Hello Worlds');
Consdev.error('Hello Worlds');
Consdev.info('Hello Worlds');
Consdev.warning('Hello Worlds');
Consdev.suggest('Hello Worlds');
```

### output
![output4](https://raw.githubusercontent.com/javercel/content/main/consdev/consdev-output4.png)

```js
Consdev.write('<comment>Hello Worlds</comment>');
Consdev.write('<success>Hello Worlds</success>');
Consdev.write('<warning>Hello Worlds</warning>');
Consdev.write('<info>Hello Worlds</info>');
Consdev.write('<error>Hello Worlds</error>');
```

### output
![output3](https://raw.githubusercontent.com/javercel/content/main/consdev/consdev-output3.png)

```js
Consdev.setStyle('title', '0451a5', 'e3dcdc', 1, 'start', 'auto');
Consdev.write('<title>Hello Worlds</title>');
```

### output
![output2](https://raw.githubusercontent.com/javercel/content/main/consdev/consdev-output2.png)

```js
Consdev.write('<bg=#27403c; fg=#ffffff; width=auto; padding=1; align=center;>Hello Worlds</>');
```

### output
![output4](https://raw.githubusercontent.com/javercel/content/main/consdev/consdev-output1.png)