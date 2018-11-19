export const DOWNLOAD_ORDER = '[orders] download'

export const downloadOrder = (what, index) => ({
	type: DOWNLOAD_ORDER,
	payload: { what, index },
})
