import {_keys, Cosmo_Module} from '@pixel-forge/cosmo-utils';
import {Cosmo_APIDefinition, cosmo_APIDefKeys, Cosmo_APIStructure, Cosmo_BodyAPI, Cosmo_QueryAPI, httpMethods_Body, httpMethods_Query} from '../shared';
import {Cosmo_ServerAPI_Body, Cosmo_ServerAPI_Query} from './Cosmo_ServerAPI';
import {CosmoModule_API} from './CosmoModule_API';

export class Cosmo_APIModule_BE
	extends Cosmo_Module {

	constructor(apiStruct: Cosmo_APIStructure) {
		super();
		this.registerAPIStruct(apiStruct);
	}

	protected registerAPIStruct (apiStruct: Cosmo_APIStructure) {
		_keys(apiStruct).forEach(key=>{
			const value = apiStruct[key];
			const isStruct = _keys(value).some(key=> !cosmo_APIDefKeys.includes(key));
			if(isStruct)
				return this.registerAPIStruct(value as Cosmo_APIStructure);

			if(httpMethods_Query.includes(value.method)) {
				CosmoModule_API.registerAPI(createQueryServerAPI(value as Cosmo_APIDefinition<any>));
				return;
			}

			if(httpMethods_Body.includes(value.method)) {
				CosmoModule_API.registerAPI(createBodyServerAPI(value as Cosmo_APIDefinition<any>));
				return;
			}
		})
	}
}

export const createQueryServerAPI = (apiDef: Cosmo_APIDefinition<Cosmo_QueryAPI<any>>) => new Cosmo_ServerAPI_Query(apiDef);

export const createBodyServerAPI = (apiDef: Cosmo_APIDefinition<Cosmo_BodyAPI<any, any>>) => new Cosmo_ServerAPI_Body(apiDef);