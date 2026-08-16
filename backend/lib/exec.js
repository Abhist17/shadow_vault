"use strict";

const { execFile } = require("child_process");

/**
 * Run a binary with an explicit argument vector.
 *
 * Everything in this project that touches the shell goes through here. The
 * previous implementation built command strings and passed them to `exec`,
 * which meant a request body field like `depositId` landed in a shell — a
 * straightforward command injection. `execFile` never spawns a shell, so
 * arguments cannot escape their position no matter what they contain.
 */
function run(bin, args, options = {}) {
  return new Promise((resolve, reject) => {
    execFile(
      bin,
      args,
      {
        cwd: options.cwd,
        timeout: options.timeout ?? 180_000,
        maxBuffer: options.maxBuffer ?? 64 * 1024 * 1024,
        env: process.env,
      },
      (error, stdout, stderr) => {
        if (error) {
          const failure = new Error(
            `${bin} ${args.join(" ")} failed: ${stderr?.trim() || error.message}`
          );
          failure.stdout = stdout;
          failure.stderr = stderr;
          failure.cause = error;
          return reject(failure);
        }
        resolve({ stdout: stdout.toString(), stderr: stderr.toString() });
      }
    );
  });
}

module.exports = { run };
