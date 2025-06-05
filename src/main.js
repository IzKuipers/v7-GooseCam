const shellPid = +env.get("shell_pid");
const { GooseCamProc } = await load("process.js");

await handler.spawn(GooseCamProc, undefined, shellPid);