const fs = require("fs");

// ============================================================
// Function 1: getShiftDuration(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getShiftDuration(startTime, endTime) {
    // TODO: Implement this function
    let endArray = endTime.trim().split(":");
    let startArray = startTime.trim().split(":");

    let endHour = parseInt(endArray[0]);
    let startHour = parseInt(startArray[0]);

    let endMin = parseInt(endArray[1]);
    let startMin = parseInt(startArray[1]);

    let endSec = parseInt(endArray[2].split(" ")[0]);
    let startSec = parseInt(startArray[2].split(" ")[0]);

    let endAmPm = endTime.toLowerCase().includes('pm') ? "pm" : "am";
    let startAmPm = startTime.toLowerCase().includes('pm') ? "pm" : "am";

    if (startHour === 12) {
        startHour = 0;
    }

    if (endHour === 12) {
        endHour = 0;
    }

    if(startHour > 12 || endHour > 12 || startMin > 59 || endMin > 59 || startSec > 59 || endSec > 59) {
        console.log('Invalid Input');
        return "";
    }

    
    if(startAmPm === "pm") {
        startHour += 12;
    }

    if(endAmPm === "pm") {
        endHour += 12;
    }

    let hourDiff = endHour - startHour;
    let minDiff = endMin - startMin;
    let secDiff = endSec - startSec;

    if (secDiff < 0) {
        secDiff += 60;
        minDiff--;
    }

    if (minDiff < 0) {
        minDiff += 60;
        hourDiff--;
    }

    if(hourDiff < 0) {
        hourDiff += 24;
    }
    return hourDiff + ":" +
           (minDiff < 10 ? "0" + minDiff : minDiff) + ":" +
           (secDiff < 10 ? "0" + secDiff : secDiff);
}

// ============================================================
// Function 2: getIdleTime(startTime, endTime)
// startTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// endTime: (typeof string) formatted as hh:mm:ss am or hh:mm:ss pm
// Returns: string formatted as h:mm:ss
// ============================================================
function getIdleTime(startTime, endTime) {
    // TODO: Implement this function
     let notIdleStart = 8;
    let notIdleEnd = 22;

    let endArray = endTime.trim().split(":");
    let startArray = startTime.trim().split(":");

    let endHour = parseInt(endArray[0]);
    let startHour = parseInt(startArray[0]);

    let endMin = parseInt(endArray[1]);
    let startMin = parseInt(startArray[1]);

    let endSec = parseInt(endArray[2].split(" ")[0]);
    let startSec = parseInt(startArray[2].split(" ")[0]);

    let endAmPm = endTime.toLowerCase().includes('pm') ? "pm" : "am";
    let startAmPm = startTime.toLowerCase().includes('pm') ? "pm" : "am";

    if (startHour === 12) startHour = 0;
    if (endHour === 12) endHour = 0;

    if (startHour > 12 || endHour > 12 || startMin > 59 || endMin > 59 || startSec > 59 || endSec > 59) {
        console.log('Invalid Input');
        return "";
    }

    if (startAmPm === "pm") startHour += 12;
    if (endAmPm === "pm") endHour += 12;

    let totalIdleSeconds = 0;
    let startTotalSeconds = (startHour * 3600) + (startMin * 60) + startSec;
    let endTotalSeconds = (endHour * 3600) + (endMin * 60) + endSec;

    if (endTotalSeconds < startTotalSeconds) {
        endTotalSeconds += 24 * 3600;
    }

    for (let i = startTotalSeconds; i < endTotalSeconds; i++) {
        let currentSecondOfDay = i % (24 * 3600);
        if (currentSecondOfDay < (notIdleStart * 3600) || currentSecondOfDay >= (notIdleEnd * 3600)) {
            totalIdleSeconds++;
        }
    }

    let hourDiff = Math.floor(totalIdleSeconds / 3600);
    let minDiff = Math.floor((totalIdleSeconds % 3600) / 60);
    let secDiff = totalIdleSeconds % 60;

    return hourDiff + ":" +
           (minDiff < 10 ? "0" + minDiff : minDiff) + ":" +
           (secDiff < 10 ? "0" + secDiff : secDiff);
}

// ============================================================
// Function 3: getActiveTime(shiftDuration, idleTime)
// shiftDuration: (typeof string) formatted as h:mm:ss
// idleTime: (typeof string) formatted as h:mm:ss
// Returns: string formatted as h:mm:ss
// ============================================================
function getActiveTime(shiftDuration, idleTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    // TODO: Implement this function
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
}

// ============================================================
// Function 6: setBonus(textFile, driverID, date, newValue)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// date: (typeof string) formatted as yyyy-mm-dd
// newValue: (typeof boolean)
// Returns: nothing (void)
// ============================================================
function setBonus(textFile, driverID, date, newValue) {
    // TODO: Implement this function
}

// ============================================================
// Function 7: countBonusPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof string) formatted as mm or m
// Returns: number (-1 if driverID not found)
// ============================================================
function countBonusPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 8: getTotalActiveHoursPerMonth(textFile, driverID, month)
// textFile: (typeof string) path to shifts text file
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getTotalActiveHoursPerMonth(textFile, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 9: getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month)
// textFile: (typeof string) path to shifts text file
// rateFile: (typeof string) path to driver rates text file
// bonusCount: (typeof number) total bonuses for given driver per month
// driverID: (typeof string)
// month: (typeof number)
// Returns: string formatted as hhh:mm:ss
// ============================================================
function getRequiredHoursPerMonth(textFile, rateFile, bonusCount, driverID, month) {
    // TODO: Implement this function
}

// ============================================================
// Function 10: getNetPay(driverID, actualHours, requiredHours, rateFile)
// driverID: (typeof string)
// actualHours: (typeof string) formatted as hhh:mm:ss
// requiredHours: (typeof string) formatted as hhh:mm:ss
// rateFile: (typeof string) path to driver rates text file
// Returns: integer (net pay)
// ============================================================
function getNetPay(driverID, actualHours, requiredHours, rateFile) {
    // TODO: Implement this function
}

module.exports = {
    getShiftDuration,
    getIdleTime,
    getActiveTime,
    metQuota,
    addShiftRecord,
    setBonus,
    countBonusPerMonth,
    getTotalActiveHoursPerMonth,
    getRequiredHoursPerMonth,
    getNetPay
};
