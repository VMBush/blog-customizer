import { Text } from 'src/ui/text';
import { Spacer } from 'src/ui/spacer';

type Props = {
	children: {
		caption?: string;
		element: React.ReactNode;
	};
};

export function AsideFormElement({ children }: Props) {
	const { caption, element } = children;

	return (
		<>
			<Spacer size={50}></Spacer>
			{caption && (
				<>
					<Text as={'p'} uppercase={true} size={12} weight={800}>
						{caption}
					</Text>
					<Spacer size={4}></Spacer>
				</>
			)}
			{element}
		</>
	);
}
