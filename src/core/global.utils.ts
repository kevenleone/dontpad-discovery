import { http, filesystem } from 'gluegun'
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
    let repos = [];
    const menus = await fetchMenu(user);

    await runFolder(repos, menus, user);
    
    for (const repo of repos) {
      promises.push(fetchBody(repo));
    }

    const promisesData = await Promise.all(promises);
    let i = 0;
    for (const userData of promisesData) {
      if (userData) {
        promisesFiles.push(filesystem.writeAsync(`data/${repos[i]}.txt`, userData));
      }
      i++;
    }

    await Promise.all(promisesFiles);
    console.log({repos});
}