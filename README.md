# Mostbugs 取餐號管理
![Imgur](https://i.imgur.com/8VPPPqU.png)
## 功能
將 beacon  作為取餐 token，服務人員可透過 PC、行動裝置，了解客人的所在位置，無須在茫茫人海中尋找客人的取餐牌號
## 需求
* nodejs 6.1.0 以後版本
* 安裝藍牙 4.0 且支援 BLE 裝置之設備或 Raspberry Pi 3
* 作業系統請參閱 [NOBLE](https://github.com/sandeepmistry/noble) 支援之系統
## 安裝
* clone 專案
* 先依照 [NOBLE](https://github.com/sandeepmistry/noble) 內所使用之作業系統安裝相關驅動程式
* 確認安 nodejs 已完成安裝並使用 `node -v` 指令查看版本號
* 在專案資料夾內執行 `npm install`
* 完成
## 執行
執行有兩種方式，兩種則一即可<br />
### 方法一
切換至 [專案資料夾] / bin，執行 `node www`<br />
### 方法二
* 安裝 [PM2 進程管理](https://github.com/Unitech/pm2)，`npm install pm2 -global`
* 切換至 [專案資料夾]，執行 `pm2 start app.json`
* `pm2 monitor` 可查看專案執行狀態 (詳細指令請上官網查詢)



