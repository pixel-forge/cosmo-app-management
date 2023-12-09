import {Cosmo_Module} from '@pixel-forge/cosmo-utils';
import {Cosmo_ServerAPI} from './Cosmo_ServerAPI';
import {Cosmo_API} from '../shared';

type APIMap = { [k: string]: Cosmo_ServerAPI<any> };

class CosmoModule_API_Class
	extends Cosmo_Module {

	// ################## Class Properties ##################

	private readonly apis: APIMap = {};

	// ################## Class Logic ##################

	public registerAPI = (api: Cosmo_ServerAPI<any>) => {
		const key = api.getPath();
		if(this.apis[key])
			throw new Error(`API with path ${key} is already registered`);
		this.apis[key] = api;
	};
}

export const CosmoModule_API = new CosmoModule_API_Class();