import { useEffect, useRef } from 'react';

export const useEffectNonInitial = (effect, dependencies) => {
	const initialRender = useRef(true);

	useEffect(() => {
		let effectReturns;

		if (initialRender.current) {
			initialRender.current = false;
		} else {
			effectReturns = effect();
		}

		if (effectReturns && typeof effectReturns === 'function') {
			return effectReturns;
		}
	}, dependencies);
};