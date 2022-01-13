const { spawn } = require("child_process");

function createBackendShell(cb, command) {
  const backendShell = spawn(
    /^win/.test(process.platform) ? "npm.cmd" : "npm",
    command,
    {
      cwd: __dirname + "\\back-end",
    }
  );
  backendShell.stdout.on("data", (data) => {
    console.log(`API_says: ${data}`);
  });

  backendShell.stderr.on("data", (data) => {
    console.log(`API_says: ${data}`);
  });

  backendShell.on("error", (error) => {
    cb(error);
  });

  backendShell.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

function createFrontendShell(cb, command) {
  const frontendShell = spawn(
    /^win/.test(process.platform) ? "npm.cmd" : "npm",
    command,
    {
      cwd: __dirname + "\\front-end",
    }
  );
  frontendShell.stdout.on("data", (data) => {
    console.log(`FRONT_says: ${data}`);
  });

  frontendShell.stderr.on("data", (data) => {
    console.log(`FRONT_says: ${data}`);
  });

  frontendShell.on("error", (error) => {
    cb(error);
  });

  frontendShell.on("close", (code) => {
    console.log(`child process exited with code ${code}`);
  });
}
/*
 Possivelmente apenas funcionado em Windows, 
 checar CWD das funções de shell para se tornar 
 dinâmico de acordo com OS
*/
function runDev(cb) {
  createBackendShell(cb, ["run", "dev"]);
  createFrontendShell(cb, ["run", "dev"]);
}

function installDeps(cb) {
  createBackendShell(cb, ["install"]);
  createFrontendShell(cb, ["install"]);
  cb();
}

module.exports = {
  "run-dev": runDev,
  "install-deps": installDeps,
};
