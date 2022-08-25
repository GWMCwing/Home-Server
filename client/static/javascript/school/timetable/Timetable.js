class Timetable {
    constructor() {
        this.credit = 0;
        this.deptList = {};
        this.inPlan = []; // {dept,id}
        this.inGrid = []; // {dept,id,section[],elementId}
        this.favorite = []; // {dept,id}
    }
    setDeptList(dept, list) {
        const tempObj = {};
        for (let i = 0; i < list.length; i++) {
            tempObj[list[i].id] = list[i];
        }
        this.deptList[dept] = tempObj;
    }
    selectCourse(dept, id) {
        console.log(this.deptList[dept][id]);
    }
}
