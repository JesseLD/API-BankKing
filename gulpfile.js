// eslint-disable-next-line @typescript-eslint/no-var-requires
const gulp = require("gulp");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require("child_process");

gulp.task("run-tests", (callback) => {
  exec("npx jest", (error, stdout, stderr) => {
    console.log(stdout);
    console.error(stderr);
    if (error) {
      console.error("Erro ao executar os testes:", error);
      process.exit(1);
    }
    callback();
  });
});
