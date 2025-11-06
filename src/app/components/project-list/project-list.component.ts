import { Component } from '@angular/core';
import { ProjectInfo, PROJECTS } from './project.model';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipSet } from '@angular/material/chips';

@Component({
	selector: 'app-project-list',
	standalone: true,
	imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatChipSet, MatChip, MatCardActions],
	templateUrl: './project-list.component.html',
	styleUrl: './project-list.component.scss'
})
export class ProjectListComponent {
	projectList: ProjectInfo[] = PROJECTS;
}
