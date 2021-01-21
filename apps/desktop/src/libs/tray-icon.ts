import { app, Menu, nativeImage, Tray } from 'electron';
import * as path from 'path';
const Store = require('electron-store');
import TimerHandler from './timer';
import { LocalStore } from './getSetStore';
import { ipcMain } from 'electron';
import { TimerData } from '../local-data/timer';
import { createSettingsWindow } from '../window/settings';
import { loginPage, timeTrackerPage } from '../window/timeTracker';
import { getApiBaseUrl } from '../window/gauzy';
export default class TrayIcon {
	tray: Tray;
	constructor(setupWindow, knex, timeTrackerWindow, auth, settingsWindow) {
		const timerHandler = new TimerHandler();
		let loginPageAlreadyShow = false;
		const appConfig = LocalStore.getStore('configs');
		const store = new Store();
		const iconPath = path.join(
			__dirname,
			'..',
			'assets',
			'icons',
			'icon_16x16.png'
		);
		const iconNativePath = nativeImage.createFromPath(iconPath);
		iconNativePath.resize({ width: 16, height: 16 });
		this.tray = new Tray(iconNativePath);
		let contextMenu: any = [
			{
				id: '4',
				label: 'Setting',
				click() {
					const appSetting = LocalStore.getStore('appSetting');
					const config = LocalStore.getStore('configs');
					if (!settingsWindow) {
						settingsWindow = createSettingsWindow(settingsWindow);
					}
					settingsWindow.show();
					setTimeout(() => {
						settingsWindow.webContents.send('app_setting', {
							setting: appSetting,
							config: config
						});
						settingsWindow.webContents.send('goto_top_menu');
					}, 500);
				}
			},
			{
				id: '6',
				label: 'Check For Update',
				click() {
					const appSetting = LocalStore.getStore('appSetting');
					const config = LocalStore.getStore('configs');
					if (!settingsWindow) {
						settingsWindow = createSettingsWindow(settingsWindow);
					}
					settingsWindow.show();
					setTimeout(() => {
						settingsWindow.webContents.send('goto_update');
					}, 100);
					setTimeout(() => {
						settingsWindow.webContents.send('app_setting', {
							setting: appSetting,
							config: config
						});
					}, 500);
				}
			},
			{
				id: '0',
				label: 'Exit',
				click() {
					app.quit();
				}
			}
		];
		const unAuthMenu = [
			{
				id: '4',
				label: 'Setting',
				click() {
					const appSetting = LocalStore.getStore('appSetting');
					const config = LocalStore.getStore('configs');
					if (!settingsWindow) {
						settingsWindow = createSettingsWindow(settingsWindow);
					}
					settingsWindow.show();
					setTimeout(() => {
						settingsWindow.webContents.send('app_setting', {
							setting: appSetting,
							config: config
						});
						settingsWindow.webContents.send('goto_top_menu');
					}, 500);
				}
			},
			{
				id: '6',
				label: 'Check For Update',
				click() {
					const appSetting = LocalStore.getStore('appSetting');
					const config = LocalStore.getStore('configs');
					if (!settingsWindow) {
						settingsWindow = createSettingsWindow(settingsWindow);
					}
					settingsWindow.show();
					setTimeout(() => {
						settingsWindow.webContents.send('goto_update');
					}, 100);
					setTimeout(() => {
						settingsWindow.webContents.send('app_setting', {
							setting: appSetting,
							config: config
						});
					}, 500);
				}
			},
			{
				id: '0',
				label: 'Exit',
				click() {
					app.quit();
				}
			}
		];
		const menuAuth = [
			{
				id: '0',
				label: 'Now tracking time - 0h 0m',
				visible: false
			},
			{
				id: '6',
				label: '',
				visible: false,
				enabled: false
			},
			{
				id: '1',
				label: 'Start Tracking Time',
				visible: appConfig.timeTrackerWindow,
				click(menuItem) {
					const userLogin = store.get('auth');
					if (userLogin && userLogin.employeeId) {
						// timeTrackerWindow.show();
						setTimeout(() => {
							timeTrackerWindow.webContents.send(
								'start_from_tray',
								LocalStore.beforeRequestParams()
							);
						}, 1000);
					} else {
						timeTrackerWindow.show();
						setTimeout(async () => {
							const lastTime: any = await TimerData.getLastTimer(
								knex,
								LocalStore.beforeRequestParams()
							);
							timeTrackerWindow.webContents.send(
								'timer_tracker_show',
								{
									...LocalStore.beforeRequestParams(),
									timeSlotId:
										lastTime && lastTime.length > 0
											? lastTime[0].timeSlotId
											: null
								}
							);
						}, 1000);
					}
				}
			},
			{
				id: '2',
				label: 'Stop Tracking Time',
				enabled: false,
				visible: appConfig.timeTrackerWindow,
				click(menuItem) {
					// timeTrackerWindow.show();
					setTimeout(() => {
						timeTrackerWindow.webContents.send('stop_from_tray');
					}, 1000);
				}
			},
			{
				id: '3',
				label: 'Open Time Tracker',
				enabled: true,
				visible: appConfig.timeTrackerWindow,
				click(menuItem) {
					timeTrackerWindow.show();
					setTimeout(async () => {
						const lastTime: any = await TimerData.getLastTimer(
							knex,
							LocalStore.beforeRequestParams()
						);
						timeTrackerWindow.webContents.send(
							'timer_tracker_show',
							{
								...LocalStore.beforeRequestParams(),
								timeSlotId:
									lastTime && lastTime.length > 0
										? lastTime[0].timeSlotId
										: null
							}
						);
					}, 1000);
				}
			},
			{
				id: '6',
				label: 'Check For Update',
				click() {
					const appSetting = LocalStore.getStore('appSetting');
					const config = LocalStore.getStore('configs');
					if (!settingsWindow) {
						settingsWindow = createSettingsWindow(settingsWindow);
					}
					settingsWindow.show();
					setTimeout(() => {
						settingsWindow.webContents.send('goto_update');
					}, 100);
					setTimeout(() => {
						settingsWindow.webContents.send('app_setting', {
							setting: appSetting,
							config: config
						});
					}, 500);
				}
			},
			{
				id: '4',
				label: 'Setting',
				click() {
					const appSetting = LocalStore.getStore('appSetting');
					const config = LocalStore.getStore('configs');
					if (!settingsWindow) {
						settingsWindow = createSettingsWindow(settingsWindow);
					}
					settingsWindow.show();
					setTimeout(() => {
						settingsWindow.webContents.send('app_setting', {
							setting: appSetting,
							config: config
						});
						settingsWindow.webContents.send('goto_top_menu');
					}, 500);
				}
			},
			{
				id: '5',
				label: 'Exit',
				click() {
					app.quit();
				}
			}
		];

		const menuWindowTime = Menu.getApplicationMenu().getMenuItemById(
			'window-time-track'
		);
		const menuWindowSetting = Menu.getApplicationMenu().getMenuItemById(
			'window-setting'
		);
		if (auth && auth.employeeId) {
			contextMenu = menuAuth;
			menuWindowSetting.enabled = true;
			menuWindowTime.enabled = true;
			timeTrackerWindow.webContents.send(
				'get_user_detail',
				LocalStore.beforeRequestParams()
			);
		}
		this.tray.setContextMenu(Menu.buildFromTemplate(contextMenu));

		ipcMain.on('update_tray_start', (event, arg) => {
			contextMenu[2].enabled = false;
			contextMenu[0].visible = true;
			contextMenu[3].enabled = true;
			this.tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
		});

		ipcMain.on('update_tray_stop', (event, arg) => {
			contextMenu[2].enabled = true;
			contextMenu[0].visible = false;
			contextMenu[3].enabled = false;
			this.tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
		});

		ipcMain.on('update_tray_time_update', (event, arg) => {
			contextMenu[0].label = `Now tracking time - ${arg.hours}h ${arg.minutes}m`;
			this.tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
		});

		ipcMain.on('auth_success', (event, arg) => {
			const appConfig = LocalStore.getStore('configs');
			//check last auth
			const lastUser = store.get('auth');
			if (appConfig.gauzyWindow) {
				timeTrackerWindow.webContents.send(
					'get_user_detail',
					LocalStore.beforeRequestParams()
				);
			}
			if (lastUser && lastUser.userId !== arg.userId) {
				store.set({
					project: null
				});
			}
			store.set({
				auth: arg
			});
			if (arg.employeeId) {
				contextMenu = menuAuth;
				menuWindowTime.enabled = true;
				menuWindowSetting.enabled = true;
				menuWindowTime.visible = appConfig.timeTrackerWindow;
				this.tray.setContextMenu(Menu.buildFromTemplate(contextMenu));
			}

			if (!appConfig.gauzyWindow) {
				timeTrackerWindow.loadURL(timeTrackerPage());
				timeTrackerWindow.show();
				setTimeout(async () => {
					const lastTime: any = await TimerData.getLastTimer(
						knex,
						LocalStore.beforeRequestParams()
					);
					timeTrackerWindow.webContents.send('timer_tracker_show', {
						...LocalStore.beforeRequestParams(),
						timeSlotId:
							lastTime && lastTime.length > 0
								? lastTime[0].timeSlotId
								: null
					});
				}, 1000);
			}
		});

		ipcMain.on('logout', () => {
			this.tray.setContextMenu(Menu.buildFromTemplate(unAuthMenu));
			menuWindowSetting.enabled = false;
			menuWindowTime.enabled = false;
			const appSetting = store.get('appSetting');
			if (appSetting && appSetting.timerStarted) {
				setTimeout(() => {
					timeTrackerWindow.webContents.send('stop_from_tray');
				}, 1000);
			}
			if (LocalStore.getStore('configs').gauzyWindow) {
				timeTrackerWindow.hide();
			} else {
				if (!loginPageAlreadyShow) {
					const serverConfig = LocalStore.getStore('configs');
					global.variableGlobal = {
						API_BASE_URL: getApiBaseUrl(serverConfig),
						IS_INTEGRATED_DESKTOP: serverConfig.isLocalServer
					};
					timeTrackerWindow.loadURL(loginPage());
					timeTrackerWindow.webContents.once(
						'did-finish-load',
						() => {
							timeTrackerWindow.webContents.send('hide_register');
						}
					);
					timeTrackerWindow.show();
					loginPageAlreadyShow = true;
				}
			}
			if (settingsWindow) settingsWindow.hide();
		});

		ipcMain.on('user_detail', (event, arg) => {
			if (
				arg.employee &&
				arg.employee.organization &&
				arg.employee.organization.name
			) {
				contextMenu[1].label = arg.employee.organization.name;
				contextMenu[1].visible = true;
			}
		});
	}
}
