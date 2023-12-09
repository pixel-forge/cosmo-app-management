import {Cosmo_Logger} from '@pixel-forge/cosmo-utils';
import {Cosmo_API, Cosmo_APIDefinition, Cosmo_BodyAPI, Cosmo_QueryAPI} from '../shared';

export class Cosmo_ServerAPI<API extends Cosmo_API<any, any, any, any>, APIDef extends Cosmo_APIDefinition<API> = Cosmo_APIDefinition<API>>
	extends Cosmo_Logger {

	// ################## Class Properties ##################

	protected readonly apiDef: APIDef;

	// ################## Class Lifecycle ##################

	constructor(apiDef: APIDef) {
		super();
		this.apiDef = apiDef;
	}

	// ################## Class Logic ##################

	public getPath = () => {
		let path = '';
		if(!this.apiDef.path.startsWith('/'))
			path +='/';
		path += this.apiDef.path;
		return path;
	}

	public getMethod = () => {
		return this.apiDef.method;
	}
}

export class Cosmo_ServerAPI_Query<
	API extends Cosmo_QueryAPI<any>,
	APIDef extends Cosmo_APIDefinition<API> = Cosmo_APIDefinition<API>
>
	extends Cosmo_ServerAPI<API> {

	constructor(apiDef: APIDef) {
		super(apiDef);
	}
}

export class Cosmo_ServerAPI_Body<
	API extends Cosmo_BodyAPI<any, any>,
	APIDef extends Cosmo_APIDefinition<API> = Cosmo_APIDefinition<API>
>
	extends Cosmo_ServerAPI<API> {

	constructor(apiDef: APIDef) {
		super(apiDef);
	}
}