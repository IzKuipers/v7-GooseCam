const html = await loadHtml("body.html");
const { join } = util;

class GooseTray extends TrayIconProcess {
  constructor(handler, pid, parentPid, data) {
    super(handler, pid, parentPid, data);
  }

  async renderPopup(body) {
    body.innerHTML = html;

    const css = await this.fs.direct(join(workingDirectory, "style.css"));
    const img = body.querySelector("img.titlebar");

    img.addEventListener("click", () => {
      img.src = "";
      setTimeout(() => {
        img.src = "https://goose.izkuipers.nl/feed?t=" + performance.now();
      });
    });

    body.getElementsByTagName("link")[0].href = css;
  }
}

return { GooseTray };
