import React, { useEffect, useRef, useState } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

export default React.memo(function Mano({
	letraActual,
	materialColor,
	rotationAngle,
}) {
	const [urlModelo, seturlModelo] = useState('../../manita.glb');

	const { nodes, materials, animations } = useGLTF(urlModelo);
	const group = useRef();
	const { actions } = useAnimations(animations, nodes.Plano);
	const prevAction = usePrevious(letraActual);

	useEffect(() => {
		if (letraActual) {
			if (prevAction !== undefined && actions[prevAction]) {
				actions[prevAction].fadeOut(0.2);
			}
			if (actions[letraActual]) {
				actions[letraActual]
					.reset()
					.setEffectiveTimeScale(0.4)
					.setEffectiveWeight(1)
					.fadeIn(0.2)
					.play();
			}
		}
	}, [letraActual, actions, prevAction]);

	useEffect(() => {
		if (materialColor) {
			materials['Material.001'].color.set(materialColor);
		}
	}, [materialColor, materials]);

	return (
		<group ref={group} {...letraActual} dispose={null}>
			<group
				name='Armature'
				position={[0, 1, 0]}
				rotation={[0, rotationAngle / 50, Math.PI / 2]}
				scale={[0.18, 0.18, 0.18]}
			>
				<primitive object={nodes.mixamorigLeftHand} />
				<primitive object={nodes.neutral_bone} />
				<skinnedMesh
					name='Plano'
					geometry={nodes.Plano.geometry}
					material={materials['Material.001']}
					skeleton={nodes.Plano.skeleton}
				>
					<primitive
						object={materials['Material.001']}
						attach='material'
						roughness={1} // Ajusta el valor de rugosidad según sea necesario
					/>
				</skinnedMesh>
			</group>
		</group>
	);
});

useGLTF.preload('../../manita.glb', null);

function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}
