import { http, filesystem, print } from 'gluegun'
const baseURL = 'http://dontpad.com'
const api = http.create({ baseURL });

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

export const getUserData = async (user) => {
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

  print.success(`Found ${repos.length} files of ${user}`);
  
  for (const repo of repos) {
    promises.push(fetchBody(repo));
  }
  print.newline();

  const promisesData = await Promise.all(promises);
  for (const userData of promisesData) {
    const file = repos[i];
    if (userData) {
      print.warning(`Creating file ${file}.txt`);
      promisesFiles.push(filesystem.writeAsync(`data/${file}.txt`, userData));
    } else {
      print.error(`File ${file} not wrote, because it's empty`);
    }
    i++;
  }
  await Promise.all(promisesFiles);
  print.newline();
}