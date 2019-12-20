import { http, filesystem, print } from 'gluegun'
const baseURL = 'http://dontpad.com'
const api = http.create({ baseURL });

export function printTimestamp(message, color = "info") {
  const now = new Date().toISOString();
  const msg = `${now} - ${message}`;
  const colors = {
    success: () => print.success(msg),
    warning: () => print.warning(msg),
    debug: () => print.debug(msg),
    error: () => print.error(msg),
    info: () => print.info(msg),
  }

  if (colors[color]) {
    colors[color]();
  } else {
    print.info(message);
  }
}

const fetchMenu = async (_user) => {
  const { ok, data } = await api.get(`${_user}.menu.json?_=0`);
  if (ok && data) {
    return data;
  }
}

const getFolder = async (folders, folder, father) => {
  const fatherPath = `${father}/${folder}`;
  const f = await fetchMenu(fatherPath);
  folders.push(fatherPath);
  await runFolder(folders, f, fatherPath);
}

const runFolder = async (folders, arr, father) => {
  for (const folder of arr) {
    await getFolder(folders, folder, father);
  }
}

const fetchBody = async (user) => {
  const { ok, data } = await api.get(`${user}.body.json?lastUpdate=0`);
  if (ok) {
    return data.body;
  }
}

export const getUserData = async (usr) => {
  const user = usr.trim();
  const promises = [];
  const promisesFiles = [];

  let i = 0;
  let repos = [user];
  let spin = print.spin(`Fetching repositories of ${user}`);
  
  const menus = await fetchMenu(user);
  spin.stopAndPersist();
  spin = print.spin(`Fetching repositories data of ${user}`);
  await runFolder(repos, menus, user);
  spin.stopAndPersist();

  print.divider();

  printTimestamp(`Found ${repos.length} files of ${user}`, 'success');
  
  for (const repo of repos) {
    promises.push(fetchBody(repo));
  }
  print.newline();

  const promisesData = await Promise.all(promises);
  for (const userData of promisesData) {
    const file = repos[i];
    if (userData) {
      printTimestamp(`Creating file ${file}.txt`, 'warning');
      promisesFiles.push(filesystem.writeAsync(`data/${file}.txt`, userData));
    } else {
      printTimestamp(`File ${file} not wrote, because it's empty`, 'error');
    }
    i++;
  }
  await Promise.all(promisesFiles);
  print.newline();
}

export const welcome = () => {
  printTimestamp('Welcome to dontscovery, starting to process');
  print.divider();
}