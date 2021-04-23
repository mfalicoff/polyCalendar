export interface TheorySection {
    theorySection: number;
    theorySectionTime: string;
    theorySectionDay: string;
    theorySectionLocale: string;
}

export interface PracticeSection {
    practiceSection: number;
    practiceSectionTime: string;
    practiceSectionDay: string;
    practiceSectionLocale: string;
}

export interface AllSections {
    theorySections: TheorySection[];
    practiceSections: PracticeSection[];
}
