import peopleLocal from './people.json';
import peopleRemote from './people.json?remote=true';

const { log } = console;

log('LOCAL:');
log(peopleLocal);

log('REMOTE:');
log(peopleRemote);
