const sh = require("shelljs")
const md5 = require("md5")

sh.echo("renaming files...")
sh.ls("!(.gitignore|magius-db.json)").forEach(file => {
  sh.echo(file)
  const extension = file.match(/\.[^.]*$/)[0]
  const md5Hash = md5(sh.cat(file))
  sh.mv(file, md5Hash + extension)
})
sh.echo('done')

