import axios, { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { Class } from '@interfaces/class/class.interface';
import { AllSections, PracticeSection, TheorySection } from '@interfaces/class/sections.interface';

class ClassCrawler {
    private allClasses: Class[] = [];
    private classesBA = 'https://www.polymtl.ca/programmes/cours/horaire?cycle=BA';
    private classesMA = 'https://www.polymtl.ca/programmes/cours/horaire?cycle=ES';

    public async getClasses(): Promise<Class[]> {
        const bacPage = await axios.get(this.classesBA);
        const mastersPage = await axios.get(this.classesMA);
        const baClasses = await this.parsePage(bacPage);
        const maClasses = await this.parsePage(mastersPage);
        this.allClasses = baClasses.concat(maClasses);
        return this.allClasses;
    }

    private async parsePage(bacPage: AxiosResponse) {
        const $ = cheerio.load(bacPage.data);
        const currentClassesLevel: Class[] = [];

        $('.pane-content')
            .find('h2')
            .each((i, elem: any) => {
                const className = elem.children[0].children[0].data;
                const allSections: AllSections = {
                    theorySections: [],
                    practiceSections: [],
                };
                currentClassesLevel.push({
                    name: className,
                    schedule: allSections,
                });
            });

        $('.pane-content')
            .find('.horaire')
            .each((i, elem: any) => {
                // for class without Lab
                if (elem.children.length !== 5) {
                    const theorySection: TheorySection[] = [];
                    const theoryGroup = elem.children[1].children[1].children[3].children[3].children[1].children[0].data;
                    let theoryDay = elem.children[1].children[1].children[3].children[3].children[3].children[0].data;
                    let theoryTime = elem.children[1].children[1].children[3].children[3].children[5].children[0].data;
                    let theoryLocale = '';
                    if (
                        elem.children[1].children[1].children[3].children[3].children.length < 8 // no class in site
                    ) {
                        theoryDay = '';
                        theoryTime = 'Consultez Site web du Cours';
                        theoryLocale = '';
                    } else {
                        theoryLocale = elem.children[1].children[1].children[3].children[3].children[7].children[0].data;
                    }

                    theorySection.push({
                        theorySection: theoryGroup,
                        theorySectionDay: theoryDay,
                        theorySectionLocale: theoryLocale,
                        theorySectionTime: theoryTime,
                    });
                    currentClassesLevel[i].schedule = {
                        theorySections: theorySection,
                        practiceSections: [],
                    };
                } else {
                    const theorySection: TheorySection[] = [];

                    const currentTableTheoryClass = elem.children[1].children[1].children[3];

                    for (let j = 3; j < currentTableTheoryClass.children.length; j = j + 2) {
                        let theoryGroup = currentTableTheoryClass.children[j].children[1].children[0].data;
                        if (theoryGroup.length === 1) {
                            theoryGroup = currentTableTheoryClass.children[j - 2].children[1].children[0].data;
                        }
                        const theoryDay = currentTableTheoryClass.children[j].children[3].children[0].data;
                        const theoryTime = currentTableTheoryClass.children[j].children[5].children[0].data;
                        const theoryLocale = currentTableTheoryClass.children[j].children[7].children[0].data;

                        theorySection.push({
                            theorySection: theoryGroup,
                            theorySectionDay: theoryDay,
                            theorySectionLocale: theoryLocale,
                            theorySectionTime: theoryTime,
                        });
                    }

                    const practiceSection: PracticeSection[] = [];

                    const currentTablePracticeClass = elem.children[3].children[1].children[3];
                    for (let j = 3; j < currentTablePracticeClass.children.length; j = j + 2) {
                        let practiceGroup = currentTablePracticeClass.children[j].children[1].children[0].data;
                        if (practiceGroup.length === 1) {
                            practiceGroup = currentTablePracticeClass.children[j - 2].children[1].children[0].data;
                        }
                        const practiceDay = currentTablePracticeClass.children[j].children[3].children[0].data;
                        const practiceTime = currentTablePracticeClass.children[j].children[5].children[0].data;
                        const practiceLocale = currentTablePracticeClass.children[j].children[7].children[0].data;

                        practiceSection.push({
                            practiceSection: practiceGroup,
                            practiceSectionTime: practiceTime,
                            practiceSectionDay: practiceDay,
                            practiceSectionLocale: practiceLocale,
                        });
                    }
                    currentClassesLevel[i].schedule = {
                        theorySections: theorySection,
                        practiceSections: practiceSection,
                    };
                }
            });
        return currentClassesLevel;
    }
}

export default ClassCrawler;
