import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
@Injectable({
	providedIn: 'root'
})
export class TimeTrackerService {
	AW_HOST = environment.AWHost;
	token = '';
	userId = '';
	employeeId = '';
	constructor(private http: HttpClient) {}

	createAuthorizationHeader(headers: Headers) {
		headers.append('Authorization', 'Basic ' + btoa('username:password'));
	}

	getTasks(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`,
			'Tenant-ID': values.tenantId
		});
		return this.http
			.get(`${values.apiHost}/api/tasks/employee/${values.employeeId}`, {
				headers: headers
			})
			.pipe()
			.toPromise();
	}

	getProjects(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`,
			'Tenant-ID': values.tenantId
		});
		return this.http
			.get(
				`${values.apiHost}/api/organization-projects/employee/${values.employeeId}`,
				{
					headers: headers
				}
			)
			.pipe()
			.toPromise();
	}

	getClient(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`,
			'Tenant-ID': values.tenantId
		});
		return this.http
			.get(
				`${values.apiHost}/api/organization-contact/employee/${values.employeeId}`,
				{
					headers: headers
				}
			)
			.pipe()
			.toPromise();
	}

	getUserDetail(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`,
			'Tenant-ID': values.tenantId
		});
		return this.http
			.get(
				`${values.apiHost}/api/user/me?data={"relations":  ["employee", "tenant", "employee.organization"]}`,
				{
					headers: headers
				}
			)
			.pipe()
			.toPromise();
	}

	getTimeLogs(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`,
			'Tenant-ID': values.tenantId
		});

		return this.http
			.get(`${values.apiHost}/api/timesheet/time-log/`, {
				headers: headers,
				params: {
					startDate: moment().startOf('day').utc().format(),
					endDate: moment().endOf('day').utc().format()
				}
			})
			.pipe()
			.toPromise();
	}

	getTimeSlot(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`,
			'Tenant-ID': values.tenantId
		});
		return this.http
			.get(
				`${values.apiHost}/api/timesheet/time-slot/${values.timeSlotId}?relations[]=screenshots&relations[]=activities&relations[]=employee`,
				{
					headers: headers
				}
			)
			.pipe()
			.toPromise();
	}

	pingAw(host) {
		return this.http.get(host).pipe().toPromise();
	}

	toggleApiStart(values) {
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`
		});

		return this.http
			.post(
				`${values.apiHost}/api/timesheet/timer/toggle`,
				{
					description: values.note,
					isBillable: true,
					logType: 'TRACKED',
					projectId: values.projectId,
					taskId: values.taskId,
					source: 'DESKTOP',
					manualTimeSlot: values.manualTimeSlot,
					organizationId: values.organizationId,
					tenantId: values.tenantId,
					organizationContactId: values.organizationContactId
				},
				{
					headers: headers
				}
			)
			.pipe()
			.toPromise();
	}

	deleteTimeSlot(values) {
		const params = this.toParams({
			ids: [values.timeSlotId],
			tenantId: values.tenantId
		});
		const headers = new HttpHeaders({
			Authorization: `Bearer ${values.token}`
		});
		return this.http
			.delete(`${values.apiHost}/api/timesheet/time-slot`, {
				params,
				headers: headers
			})
			.pipe()
			.toPromise();
	}

	toParams(query) {
		let params: HttpParams = new HttpParams();
		Object.keys(query).forEach((key) => {
			if (this.isJsObject(query[key])) {
				params = this.toSubParams(params, key, query[key]);
			} else {
				params = params.append(key.toString(), query[key]);
			}
		});
		return params;
	}

	isJsObject(object: any) {
		return (
			object !== null &&
			object !== undefined &&
			typeof object === 'object'
		);
	}

	toSubParams(params: HttpParams, key: string, object: any) {
		Object.keys(object).forEach((childKey) => {
			if (this.isJsObject(object[childKey])) {
				params = this.toSubParams(
					params,
					`${key}[${childKey}]`,
					object[childKey]
				);
			} else {
				params = params.append(`${key}[${childKey}]`, object[childKey]);
			}
		});

		return params;
	}
}
