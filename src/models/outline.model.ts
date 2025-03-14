export interface BibleReference {
    version: string;
    book: string;
    chapter: string;
    verses: string[];
}

export interface Topic {
    type: 'text' | 'bible_reference';
    content: string | BibleReference;
}

export interface Outline {
    id?: string;
    userId: string;
    title: string;
    introduction: Topic[];
    development: Topic[];
    conclusion: Topic[];
    createdAt?: Date;
    updatedAt?: Date;
}

export class OutlineModel implements Outline {
    id?: string;
    userId: string;
    title: string;
    introduction: Topic[];
    development: Topic[];
    conclusion: Topic[];
    createdAt?: Date;
    updatedAt?: Date;

    constructor(data: Outline) {
        this.id = data.id;
        this.userId = data.userId;
        this.title = data.title;
        this.introduction = data.introduction;
        this.development = data.development;
        this.conclusion = data.conclusion;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
    }
} 