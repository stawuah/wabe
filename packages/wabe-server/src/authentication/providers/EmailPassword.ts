import type {
	AuthenticationEventsOptions,
	ProviderInterface,
} from '../interface'

type EmailPasswordInterface = {
	password: string
	email: string
}

export class EmailPassword
	implements ProviderInterface<EmailPasswordInterface>
{
	async onSignIn({
		input,
		context,
	}: AuthenticationEventsOptions<EmailPasswordInterface>) {
		// TODO : Use first here but need to refactor in graphql and mongoadapter to have first and not limit
		const users = await context.wabeApp.databaseController.getObjects({
			className: 'User',
			where: {
				authentication: {
					// @ts-expect-error
					emailPassword: {
						email: { equalTo: input.email },
					},
				},
			},
			context: {
				...context,
				isRoot: true,
			},
			fields: ['authentication'],
		})

		if (users.length === 0)
			throw new Error('Invalid authentication credentials')

		const user = users[0]

		const userDatabasePassword =
			user.authentication?.emailPassword?.password

		if (!userDatabasePassword)
			throw new Error('Invalid authentication credentials')

		const isPasswordEquals = await Bun.password.verify(
			input.password,
			userDatabasePassword,
			'argon2id',
		)

		if (
			!isPasswordEquals ||
			input.email !== user.authentication?.emailPassword?.email
		)
			throw new Error('Invalid authentication credentials')

		return {
			user,
		}
	}

	async onSignUp({
		input,
		context,
	}: AuthenticationEventsOptions<EmailPasswordInterface>) {
		const users = await context.wabeApp.databaseController.getObjects({
			className: 'User',
			where: {
				authentication: {
					// @ts-expect-error
					emailPassword: {
						email: { equalTo: input.email },
					},
				},
			},
			context,
			fields: [],
		})

		if (users.length > 0) throw new Error('User already exists')

		return {
			authenticationDataToSave: {
				email: input.email,
				password: await Bun.password.hash(input.password, 'argon2id'),
			},
		}
	}
}