const _consdev = require('./src/consdev');
const Consdev = new _consdev;

Consdev.write('<comment>Hello Worlds</comment>');
Consdev.write('<success>Hello Worlds</success>');
Consdev.write('<warning>Hello Worlds</warning>');
Consdev.write('<info>Hello Worlds</info>');
Consdev.write('<error>Hello Worlds</error>');

Consdev.success('Hello Worlds');
Consdev.error('Hello Worlds');
Consdev.info('Hello Worlds');
Consdev.warning('Hello Worlds');
Consdev.suggest('Hello Worlds');

Consdev.setStyle('title', '0451a5', 'e3dcdc', 1, 'start', 'auto');
Consdev.write('<title>Hello Worlds</title>');

Consdev.write('<bg=#27403c; fg=#ffffff; width=auto; padding=1; align=center;>Hello Worlds</>');