import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article';
import { ArticleParamsForm } from './components/article-params-form';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] =
		useState<ArticleStateType>(defaultArticleState);

	const handleApply = (newSettings: ArticleStateType) => {
		setSettings(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} title='Задайте параметры' />
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
