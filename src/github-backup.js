const {githubToken} = require('../secrets.js');
const sh = require("shelljs-exec-proxy");

const currentDate = new Date().toISOString().slice(0, 10);
const backupDir = "D:/backups/github/" + currentDate;

const headers = `Authorization: token ${githubToken}`;
const endpoint = "https://api.github.com/user/repos";

const repos = JSON.parse(sh.curl("-H", headers, endpoint));

repos.forEach(repo => {
  sh.git.clone(repo.ssh_url, `${backupDir}/${repo.name}`);
});
