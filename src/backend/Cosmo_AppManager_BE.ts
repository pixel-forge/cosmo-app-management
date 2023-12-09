import {Cosmo_ClientLogger, Cosmo_LogClient_Browser, Cosmo_ModuleManager} from '@pixel-forge/cosmo-utils';
import {Cosmo_ServerAPI} from './Cosmo_ServerAPI';

type APIMap = { [k: string]: Cosmo_ServerAPI<any> };

export class Cosmo_AppManager_BE
	extends Cosmo_ModuleManager {

	// ################## Class Properties ##################

	static instance: Cosmo_AppManager_BE;

	private readonly apis: APIMap = {};

	// ################## Class Lifecycle ##################

	constructor() {
		super();
		if (Cosmo_AppManager_BE.instance)
			throw new Error('Can not create more than 1 instance of Cosmo_AppManager_FE!');

		Cosmo_AppManager_BE.instance = this;
	}

	init() {
		Cosmo_ClientLogger.addClient(Cosmo_LogClient_Browser);
		super.init();
	}

	// ################## Class Logic ##################

	public registerAPI = (api: Cosmo_ServerAPI<any>) => {
		const key = api.getPath();
		this.apis[key] = api;
	};
}