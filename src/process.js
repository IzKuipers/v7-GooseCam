const { GooseTray } = await load("tray.js");
const { join } = util;

class GooseCamProc extends Process {
  constructor(handler, pid, parentPid) {
    super(handler, pid, parentPid);
  }

  async start() {
    if (+this.env.get("goosecam_pid")) return false;

    this.env.set("goosecam_pid", this.pid);

    const shell = this.handler.getProcess(+env.get("shell_pid"));
    const icon = await this.fs.direct(join(workingDirectory, "goosecam.png"));

    shell.trayHost.createTrayIcon(
      this.pid,
      "GooseTray",
      {
        icon,
        popup: {
          width: 320,
          height: 240,
        },
      },
      GooseTray
    );
  }

  async stop() {
    this.env.delete("goosecam_pid");
  }
}

return { GooseCamProc };
