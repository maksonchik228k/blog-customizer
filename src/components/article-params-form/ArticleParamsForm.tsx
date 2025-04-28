import { useState, useEffect, useRef, useCallback } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';
import { RadioGroup } from 'src/ui/radio-group';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
	OptionType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	onApply: (settings: ArticleStateType) => void;
	title: string;
};

export const ArticleParamsForm = ({
	onApply,
	title,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleChange = useCallback(
		(key: keyof ArticleStateType, value: OptionType) => {
			setFormState((prev) => ({ ...prev, [key]: value }));
		},
		[]
	);

	const handleApply = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			onApply(formState);
		},
		[formState, onApply]
	);

	const handleReset = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();
			setFormState(defaultArticleState);
			onApply(defaultArticleState);
		},
		[onApply]
	);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						{title}
					</Text>
					<div className={styles.section}>
						<Text size={12} weight={800} uppercase>
							Шрифт
						</Text>
						<Select
							options={fontFamilyOptions}
							selected={formState.fontFamilyOption}
							onChange={(value) => handleChange('fontFamilyOption', value)}
							onClose={() => setIsOpen(false)}
						/>
					</div>
					<div className={styles.section}>
						<Text size={12} weight={800} uppercase>
							Размер шрифта
						</Text>
						<RadioGroup
							name='fontSize'
							title=''
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(value) => handleChange('fontSizeOption', value)}
						/>
					</div>
					<div className={styles.section}>
						<Text size={12} weight={800} uppercase>
							Цвет шрифта
						</Text>
						<Select
							options={fontColors}
							selected={formState.fontColor}
							onChange={(value) => handleChange('fontColor', value)}
							onClose={() => setIsOpen(false)}
						/>
					</div>
					<div className={styles.section}>
						<Text size={12} weight={800} uppercase>
							Цвет фона
						</Text>
						<Select
							options={backgroundColors}
							selected={formState.backgroundColor}
							onChange={(value) => handleChange('backgroundColor', value)}
							onClose={() => setIsOpen(false)}
						/>
					</div>
					<div className={styles.section}>
						<Text size={12} weight={800} uppercase>
							Ширина контента
						</Text>
						<Select
							options={contentWidthArr}
							selected={formState.contentWidth}
							onChange={(value) => handleChange('contentWidth', value)}
							onClose={() => setIsOpen(false)}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='СБРОСИТЬ' htmlType='reset' type='clear' />
						<Button title='ПРИМЕНИТЬ' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
