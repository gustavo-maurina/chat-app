const { spawn } = require("child_process");

function createBackendShell(cb) {
  const backendShell = spawn(
    /^win/.test(process.platform) ? "npm.cmd" : "npm",
    ["run", "dev"],
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
    cb(`child process exited with code ${code}`);
  });
}

function createFrontendShell(cb) {
  const frontendShell = spawn(
    /^win/.test(process.platform) ? "npm.cmd" : "npm",
    ["run", "dev"],
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
    cb(`child process exited with code ${code}`);
  });
}
/*
 Possivelmente apenas funcionado em Windows, 
 checar CWD das funções de shell para se tornar 
 dinâmico de acordo com OS
*/
function runDev(cb) {
  createBackendShell(cb);
  createFrontendShell(cb);
}

module.exports = {
  "run-dev": runDev,
};
