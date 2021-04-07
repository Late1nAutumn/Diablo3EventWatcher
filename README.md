# Diablo 3 Event Watcher

This ugly application helps reminding the user when skill duration expired by detecting global keyboard/mouse event. It also allows setting up watchers to alert incoming looping buffs.

**[Download](https://drive.google.com/drive/folders/1FM9TpR2tfBZXzSCnq3XIrpR4FLJYiaaO?usp=sharing)**

**The app also relies on Java Runtime Environment to kick.** You need to install it if you don't have it. Installation could be found on offical web site. But if it fails, I have a working install pack **[here](https://drive.google.com/file/d/1MVl4cNIKNEbd63LTCNCCEYFl3ZN9iB2d/view?usp=sharing)**.

May the primal ancient be with you.

## For Dev

### Compile (IMPORTANT)

The app uses React framework to build the UI. Thus, bundle from webpack is needed before compiling with Electron.

The key feature depends on [GKM](https://github.com/tomzx/gkm) to detect global mouse and key event. While this object is running child process with .jar, Electron will simply pack these files up without compiling and then GKM will lose the path to them.

After building with Electron, **move `./src/lib/gkm.jar` and `./src/lib/lib` into the root folder of the unpacked app**. This will allow GKM to excute the .jar file after compiled.

### Commands

```bash
# Build Webpack
npm run build
# Run Electron app on dev mode
npm start
# Distribute Electron bundle
npm run dist
```
