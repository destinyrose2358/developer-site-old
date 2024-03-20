import ProjectData, { ProjectsCollection } from "./ProjectData";

export default class ProjectCategory {
    name: string;
    projects: ProjectsCollection = {};

    constructor(name: string) {
        this.name = name;
    }

    addProject(newProject: ProjectData) {
        if (this.projects[newProject.title] !== undefined) {
            this.projects[newProject.title].removeCategory()
        }
        this.projects[newProject.title] = newProject;
        newProject.setCategory(this);
    }

    removeProject(title: string) {
        delete this.projects[title];
    }
}
