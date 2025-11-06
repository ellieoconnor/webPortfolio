export interface ProjectInfo {
	title: string;
	description: string;
	image?: string;
	techUsed: string[];
	githubUrl: string;
	liveUrl?: string;
}

export const PROJECTS: ProjectInfo[] = [
	{
		title: 'Legend of Zelda - Breath of the Wild Compendium',
		description:
			'A lookup tool for creatures, weapons, monsters and treasures from Breath of the Wild. Users can search items or use categories to explore. Built using the Hyrule Compendium API.',
		techUsed: ['JavaScript', 'HTML', 'CSS'],
		githubUrl: 'https://github.com/ellieoconnor/hyrule-compendium.git',
		liveUrl: 'https://hyrule-botw-compendium.netlify.app/'
	}
];
