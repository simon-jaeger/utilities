import fs from "fs";
import fetch from "node-fetch";

const endpoint = "https://cpv2api.com/pens/public/simon-jaeger?page=";
const currentDate = new Date().toISOString().slice(0, 10);
const backupDir = "D:/backups/codepen/" + currentDate;
const fileTypesList = ["html", "css", "js"];

async function main() {
  await fs.promises.mkdir(backupDir, { recursive: true });

  for (let page = 0; ; page++) {
    const penList = await (await fetch(endpoint + page)).json();
    if (!penList.data) break;

    for (const pen of penList.data) {
      console.log(pen.title + "...");
      for (const fileType of fileTypesList) {
        const data = await (await fetch(`${pen.link}.${fileType}`)).buffer();
        await fs.promises.writeFile(
          `${backupDir}/${pen.title}.${fileType}`,
          data,
        );
      }
    }
  }
}

main()
  .then(() => {
    console.log("backup complete");
  })
  .catch(error => {
    console.error("backup failed: " + error);
  });
