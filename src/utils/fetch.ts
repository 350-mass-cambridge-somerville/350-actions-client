export function responseToJson(response: Response): Promise<any> {
	if (!response.ok) {
		throw new Error(`Request failed with code ${response.status}`);
	}
	return response.json();
}