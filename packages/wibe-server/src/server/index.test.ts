import { describe, expect, it } from 'bun:test'
import { WibeApp } from '.'
import { DatabaseEnum } from '../database'

describe('Server', () => {
	it('should run server', async () => {
		const wibe = new WibeApp({
			database: {
				type: DatabaseEnum.Mongo,
				url: 'mongodb://localhost:27017',
			},
			port: 3000,
			schema: [
				{ name: 'Collection 1', fields: { name: { type: 'string' } } },
			],
		})

		const res = await fetch('http://127.0.0.1:3000/health')

		expect(res.status).toEqual(200)
		await wibe.close()
	})
})