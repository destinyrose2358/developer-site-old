import ProjectCategory from "./ProjectCategory";

export type ProjectsCollection = {
    [title: string]: ProjectData;
}

export default class ProjectData {
    title: string;
    description: string;
    wip: boolean;
    category?: ProjectCategory;
    dependencies: ProjectsCollection = {};
    dependents: ProjectsCollection = {};
    relatedProjects: ProjectsCollection = {};

    constructor(title: string, description: string, wip: boolean = false) {
        this.title = title;
        this.description = description;
        this.wip = wip;
    }

    setCategory(newCategory: ProjectCategory) {
        if (this.category !== undefined) {
            console.log(`Setting Category to ${newCategory.name} ran into an existing Category of the same name`)
            this.category.removeProject(this.title);
        }
        this.category = newCategory;
        newCategory.addProject(this);
    }

    removeCategory() {
        this.category = undefined;
    }

    addDependent(newDependent: ProjectData) {
        if (this.dependents[newDependent.title] !== undefined) {
            console.log(`${newDependent.title} was already occupied, please verify no projects are duplicates`);
            this.dependents[newDependent.title].removeDependency(this.title);
        }
        this.dependents[newDependent.title] = newDependent;
        newDependent.addDependency(this);
    }

    private removeDependent(title: string) {
        delete this.dependents[title];
    }

    private addDependency(newDependency: ProjectData) {
        if (this.dependencies[newDependency.title] !== undefined) {
            console.log(`${newDependency.title} was already occupied, please verify no projects are duplicates`);
            this.dependencies[newDependency.title].removeDependent(this.title);
        }
        this.dependencies[newDependency.title] = newDependency;
    }

    private removeDependency(title: string) {
        delete this.dependencies[title];
    }

    addRelatedProject(newRelatedProject: ProjectData) {
        if (this.relatedProjects[newRelatedProject.title] !== undefined) {
            console.log(`${newRelatedProject.title} was already occupied, please verify no projects are duplicates`);
            this.relatedProjects[newRelatedProject.title].removeRelatedProject(this.title);
        }
        this.addRelatedProjectHelper(newRelatedProject);
        newRelatedProject.addRelatedProjectHelper(this);
    }

    private removeRelatedProject(title: string) {
        delete this.relatedProjects[title];
    }

    private addRelatedProjectHelper(newRelatedProject: ProjectData) {
        this.relatedProjects[newRelatedProject.title] = newRelatedProject;
    }
}
