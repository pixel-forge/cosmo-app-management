import * as React from 'react';
import {Cosmo_ClientLogger, Cosmo_LogClient_Browser, Cosmo_ModuleManager} from '@pixel-forge/cosmo-utils';
import {createRoot} from 'react-dom/client';

export class Cosmo_AppManager_FE
	extends Cosmo_ModuleManager {

	// ################## Class Properties ##################

	static instance: Cosmo_AppManager_FE;

	private app!: React.ReactNode;

	// ################## Class Lifecycle ##################

	constructor() {
		super();
		if(Cosmo_AppManager_FE.instance)
			throw new Error('Can not create more than 1 instance of Cosmo_AppManager_FE!');

		Cosmo_AppManager_FE.instance = this;
	}

	init = () => {
		Cosmo_ClientLogger.addClient(Cosmo_LogClient_Browser);
		super.init();

		if(!this.app) {
			this.logError('Must use setApp before calling init!');
			throw new Error('Did not use setApp before init');
		}

		//Create Root Element
		let rootEl = document.getElementById('root');
		if(!rootEl) {
			rootEl = document.createElement('div');
			rootEl.setAttribute('id', 'root');
			document.body.appendChild(rootEl);
		}
		createRoot(rootEl).render(this.app);
	}

	// ################## Class Logic ##################

	public setApp = (app: React.ReactNode) => {
		this.app = app;
	}
}