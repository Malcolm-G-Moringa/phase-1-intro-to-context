// Your code here
function createEmployeeRecord(person){
    const record = {
        firstName:person[0],
        familyName:person[1],
        title:person[2],
        payPerHour:person[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
    return record;
}

function createEmployeeRecords(employees){
    const newRecords=[];
   employees.forEach(employee=>{
    const record = createEmployeeRecord(employee)
    newRecords.push(record);
   })
    return newRecords;
}

function createTimeInEvent(record,timeStamp){
    const dateTime = timeStamp.split(" ");
    const dateObject = {
        type: "TimeIn",
        hour: +dateTime[1],
        date: dateTime[0]
    };
    record.timeInEvents.push(dateObject);
    return record;
}

function createTimeOutEvent(record,timeStamp){
    const dateTime = timeStamp.split(" ");
    const dateObject = {
        type: "TimeOut",
        hour: +dateTime[1],
        date: dateTime[0]
    };
    record.timeOutEvents.push(dateObject);
    return record;
}

function hoursWorkedOnDate(record,date){
    let clockOut = record.timeOutEvents.find(item=>item.date==date);
    let clockIn = record.timeInEvents.find(item=>item.date==date);
    return ((clockOut.hour - clockIn.hour)/100);
}

function wagesEarnedOnDate(record,date){
    const hours = hoursWorkedOnDate(record,date);
    const payRate = record.payPerHour;
    return hours*payRate;
}

function allWagesFor(record){
    let amount = 0;
    amount = record.timeOutEvents.reduce((accumulator,item)=>{
        const onDate = item.date;
        return (accumulator+ wagesEarnedOnDate(record,onDate));
    },0)
    return amount;
}

function calculatePayroll(records){
    return (records.reduce((accumulator,item)=>{
        return (accumulator+allWagesFor(item));
    },0))
}