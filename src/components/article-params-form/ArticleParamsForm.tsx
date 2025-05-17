import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect, useRef } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontSizeOptions,
	fontFamilyOptions,
} from '../../constants/articleProps';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';
import { AsideFormElement } from 'src/ui/asideFormElement';
import { Text } from 'src/ui/text';
import { Spacer } from 'src/ui/spacer';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleParamsFormProps = {
	articleState: ArticleStateType;
	setArticleState: (a: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const asideElementRef = useRef<HTMLElement | null>(null);

	const [formState, setFormState] = useState<ArticleStateType>(articleState);

	useEffect(() => {
		const closeAsideHandler = () => setIsOpen(false);

		if (isOpen) {
			document.addEventListener('click', closeAsideHandler);
		}

		return () => document.removeEventListener('click', closeAsideHandler);
	}, [isOpen]);

	useEffect(() => {
		setFormState(articleState);
	}, [articleState]);

	function submitHandler(e: React.FormEvent) {
		e.preventDefault();
		setArticleState(formState);
	}

	function resetHandler(e: React.FormEvent) {
		e.preventDefault();
		setArticleState({
			...defaultArticleState,
		});
	}

	function changeFormStateHandler(obj: Partial<ArticleStateType>) {
		setFormState({
			...formState,
			...obj,
		});
	}

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => {
					e.stopPropagation();
					setIsOpen(!isOpen);
				}}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}
				ref={asideElementRef}
				onClick={(e: React.MouseEvent<HTMLDivElement>) => {
					e.stopPropagation();
				}}>
				<form
					className={styles.form}
					onSubmit={submitHandler}
					onReset={resetHandler}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<AsideFormElement>
						{{
							element: (
								<Select
									title='шрифт'
									selected={formState.fontFamilyOption}
									options={fontFamilyOptions}
									onChange={(value) =>
										changeFormStateHandler({
											fontFamilyOption: value,
										})
									}></Select>
							),
						}}
					</AsideFormElement>
					<AsideFormElement>
						{{
							element: (
								<RadioGroup
									title='размер шрифта'
									name='font-size'
									options={fontSizeOptions}
									selected={formState.fontSizeOption}
									onChange={(value) =>
										changeFormStateHandler({
											fontSizeOption: value,
										})
									}></RadioGroup>
							),
						}}
					</AsideFormElement>
					<AsideFormElement>
						{{
							element: (
								<Select
									title='Цвет шрифта'
									selected={formState.fontColor}
									options={fontColors}
									onChange={(value) =>
										changeFormStateHandler({
											fontColor: value,
										})
									}></Select>
							),
						}}
					</AsideFormElement>
					<Spacer size={50}></Spacer>
					<Separator></Separator>
					<AsideFormElement>
						{{
							element: (
								<Select
									title='Цвет фона'
									selected={formState.backgroundColor}
									options={backgroundColors}
									onChange={(value) =>
										changeFormStateHandler({
											backgroundColor: value,
										})
									}></Select>
							),
						}}
					</AsideFormElement>
					<AsideFormElement>
						{{
							element: (
								<Select
									title='Ширина контента'
									selected={formState.contentWidth}
									options={contentWidthArr}
									onChange={(value) =>
										changeFormStateHandler({
											contentWidth: value,
										})
									}></Select>
							),
						}}
					</AsideFormElement>
					<Spacer size={50}></Spacer>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
