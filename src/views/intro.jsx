import React from "react";

const Intro = (props) => (
  <div id="intro" className="view">
    <button id="intro-backButton" onClick={() => props.viewSwitch(0)}>
      Back
    </button>
    <p>本应用通过监测本地鼠标键盘输入事件，以被动观查暗黑3角色buff触发</p>
    <p>在使用本烂应用时请注意以下事项:</p>
    <ul>
      <li>本品有潜在的串键风险，使用前请先保存正在编辑的文件</li>
      <li>使用时请赋予应用权限或关闭杀毒软件</li>
      <li>本应用需要将游戏设置为“全屏窗口”方可置顶显示</li>
      <li>应用启动前需要手动输入需监测的事项</li>
      <li>
        应用仅以理论时间推算buff持续时间。冷却时间缩短、网络延迟、游戏暂停、画面加载或角色死亡导致的不同步将不可避免
      </li>
      <li>检测器暂不支持组合键与大多数标点符号</li>
      <li>
        <a
          href="https://github.com/Late1nAutumn/Diablo3EventWatcher/blob/master/README.md"
          target="_blank"
        >
          Github
        </a>
      </li>
    </ul>
    <div id="intro-battletag">LateInAutumn#1658</div>
  </div>
);

export default Intro;
