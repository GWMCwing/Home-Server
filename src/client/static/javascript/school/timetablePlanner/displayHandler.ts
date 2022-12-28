// handle all DOM manipulation
export class DisplayHandler {
    private rightPanelDom: HTMLDivElement;
    private leftPlannerMenuDom: HTMLDivElement;
    private rightPlannerMenuDom: HTMLDivElement;
    //
    private timetableDom: HTMLDivElement;
    constructor() {
        this.rightPanelDom = document.getElementById(
            'right-panel'
        ) as HTMLDivElement;
        this.leftPlannerMenuDom = document.getElementById(
            'left-planner-menu'
        ) as HTMLDivElement;
        this.rightPlannerMenuDom = document.getElementById(
            'right-planner-menu'
        ) as HTMLDivElement;
        //
        this.timetableDom = document.getElementById(
            'timetable-grid'
        ) as HTMLDivElement;
    }
}
