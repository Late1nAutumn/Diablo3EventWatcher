# Diablo 3 Event Watcher

This ugly application helps reminding the user when skill duration expired by detecting global key / mouse event. It also allows setting up watchers to alert incoming looping buffs.

[Download](https://drive.google.com/file/d/1qzUXSL7ZDlz-UlRE99LadixMHowmSwUP/view?usp=sharing)

May the primal ancient be with you.

## For Dev

### Compile (IMPORTANT)

The app uses React framework to build the UI. Thus, bundle from webpack is needed before compiling with Electron.

The key feature depends on [GKM](https://github.com/tomzx/gkm) to detect global mouse and key event. While this object is running child process with .jar, Electron will simply pack these files up without compiling and then GKM will lose the path to them.

After building with Electron, **move ``./src/lib/gkm.jar`` and  ``./src/lib/lib`` into the root folder of the unpacked app**. This will allow GKM to excute the .jar file after compiled.

### Commands

```bash
# Build Webpack
npm run build
# Run Electron app on dev mode
npm start
# Distribute Electron bundle
npm run dist
# Build Webpack on Windows
npm run winbuild
```
