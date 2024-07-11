import type { ProviderInterface } from '../authentication'
import { getAuthenticationMethod } from '../authentication/utils'
import type { HookObject } from './HookObject'

export const callAuthenticationProvider = async (
	hookObject: HookObject<any>,
) => {
	if (!hookObject.isFieldUpdate('authentication')) return

	const authentication = hookObject.getNewData().authentication

	const { provider, name } = getAuthenticationMethod<any, ProviderInterface>(
		Object.keys(authentication),
		hookObject.context,
	)

	const inputOfTheGoodAuthenticationMethod = authentication[name]

	const { authenticationDataToSave } = await provider.onSignUp({
		input: inputOfTheGoodAuthenticationMethod,
		context: {
			...hookObject.context,
			isRoot: true,
		},
	})

	hookObject.upsertNewData('authentication', {
		[name]: {
			...authenticationDataToSave,
		},
	})
}

export const defaultCallAuthenticationProviderOnBeforeCreateUser = (
	hookObject: HookObject<any>,
) => callAuthenticationProvider(hookObject)

export const defaultCallAuthenticationProviderOnBeforeUpdateUser = (
	hookObject: HookObject<any>,
) => callAuthenticationProvider(hookObject)
