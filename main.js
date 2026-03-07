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
    let shiftArray = shiftDuration.trim().split(":");
    let idleArray = idleTime.trim().split(":");
    
    let shiftHour = parseInt(shiftArray[0]);
    let idleHour = parseInt(idleArray[0]);

    let shiftMin = parseInt(shiftArray[1]);
    let idleMin = parseInt(idleArray[1]);

    let shiftSec = parseInt(shiftArray[2]);
    let idleSec = parseInt(idleArray[2]);

    let hourDiff = shiftHour - idleHour;
    let minDiff = shiftMin - idleMin;
    let secDiff = shiftSec - idleSec;

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
// Function 4: metQuota(date, activeTime)
// date: (typeof string) formatted as yyyy-mm-dd
// activeTime: (typeof string) formatted as h:mm:ss
// Returns: boolean
// ============================================================
function metQuota(date, activeTime) {
    // TODO: Implement this function
    let activeArray = activeTime.trim().split(":");
    let activeHour = parseInt(activeArray[0]);
    let activeMin = parseInt(activeArray[1]);
    let dateArray = date.trim().split("-");
    let year = parseInt(dateArray[0]);
    let month = parseInt(dateArray[1]);
    let day = parseInt(dateArray[2]);
    let dailyQuotaHours = 8;
    let dailyQuotaMin = 24;

    if(year === 2025 && month === 4 && (day >= 10 && day <= 30)) {
        dailyQuotaHours = 6;
        dailyQuotaMin = 0;
    }
    if(activeHour > dailyQuotaHours || (activeHour === dailyQuotaHours && activeMin >= dailyQuotaMin)) {
        return true;
    } else {
        return false;
    } 
}

// ============================================================
// Function 5: addShiftRecord(textFile, shiftObj)
// textFile: (typeof string) path to shifts text file
// shiftObj: (typeof object) has driverID, driverName, date, startTime, endTime
// Returns: object with 10 properties or empty object {}
// ============================================================
function addShiftRecord(textFile, shiftObj) {
    // TODO: Implement this function
    if (!shiftObj || !shiftObj.driverID || !shiftObj.driverName || !shiftObj.date || !shiftObj.startTime || !shiftObj.endTime) {
        return {};
    }
    let driverID = shiftObj.driverID.trim();
    let driverName = shiftObj.driverName.trim();
    let date = shiftObj.date.trim();
    let startTime = shiftObj.startTime.trim();
    let endTime = shiftObj.endTime.trim();

    let shiftDuration = getShiftDuration(startTime, endTime);
    if (shiftDuration === "") return {};

    let idleTime = getIdleTime(startTime, endTime);
    let activeTime = getActiveTime(shiftDuration, idleTime);
    let quotaMet = metQuota(date, activeTime);

    let newLine = driverID + "," +
                  driverName + "," +
                  date + "," +
                  startTime + "," +
                  endTime + "," +
                  shiftDuration + "," +
                  idleTime + "," +
                  activeTime + "," +
                  quotaMet + "," +
                  false;

    let fileData = "";
    let lines = [];

    fileData = fs.readFileSync(textFile, "utf-8").trim();
    lines = fileData.split("\n");
        


    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");
        if (parts[0].trim() === driverID &&
            parts[2].trim() === date) {
            return {};
        }
    }

    let lastIndex = -1;

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");
        if (parts[0].trim() === driverID) {
            lastIndex = i;
        }
    }

    if (lastIndex === -1) {
        lines.push(newLine);
    } else {
        let updatedLines = [];
        for (let i = 0; i < lines.length; i++) {
            updatedLines.push(lines[i]);
            if (i === lastIndex) {
                updatedLines.push(newLine);
            }
        }
        lines = updatedLines;
    }

    fs.writeFileSync(textFile, lines.join("\n"), "utf-8");

    return {
        driverID: driverID,
        driverName: driverName,
        date: date,
        startTime: startTime,
        endTime: endTime,
        shiftDuration: shiftDuration,
        idleTime: idleTime,
        activeTime: activeTime,
        metQuota: quotaMet,
        hasBonus: false
    };
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
    let fileData = "";
    let lines = [];

    fileData = fs.readFileSync(textFile, "utf-8");
    if (fileData.trim() !== "") {
        lines = fileData.split("\n");
    }

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");
        if (parts[0].trim() === driverID &&
            parts[2].trim() === date) {
            parts[parts.length - 1] = newValue.toString();
            lines[i] = parts.join(",");
            break;
        }
    }
    fs.writeFileSync(textFile, lines.join("\n"), "utf-8");
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
    let fileData = fs.readFileSync(textFile, "utf-8").trim();
    let lines = [];
    lines = fileData.split("\n");

    let driverFound = false;

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");
        if (parts[0].trim() === driverID) {
            driverFound = true;
        }
    }
    if (!driverFound) return -1;
    let hasBonusCount = 0;
    if(month.length === 1) {
        month = "0" + month;
    }
    for(let i = 0 ; i < lines.length; i++) {
        let parts = lines[i].split(",");
        if(parts[0].trim() === driverID && parts[2].trim().split("-")[1] === month) {
            if(parts[parts.length - 1].trim() === "true") {
                hasBonusCount++;
            }
        }
    }
    return hasBonusCount;
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
    let lines = [];
    driverID = driverID.trim();
    lines = fs.readFileSync(textFile, "utf-8").trim().split("\n");
    let totalSeconds = 0;
    let driverFound = false;

    let monthStr = month < 10 ? "0" + month : month.toString();

    for (let i = 0; i < lines.length; i++) {
        let parts = lines[i].split(",");
        if (parts[0].trim() === driverID) {
            driverFound = true;
            if (parts[2].trim().split("-")[1] === monthStr) {
                let activeTime = parts[7].trim().split(":");
                let activeHour = parseInt(activeTime[0]);
                let activeMin = parseInt(activeTime[1]);
                let activeSec = parseInt(activeTime[2]);
                totalSeconds += (activeHour * 3600) + (activeMin * 60) + activeSec;
            }
        }
    }

    if (!driverFound) return "0:00:00";

    let hourDiff = Math.floor(totalSeconds / 3600);
    let minDiff = Math.floor((totalSeconds % 3600) / 60);
    let secDiff = totalSeconds % 60;

    return hourDiff + ":" +
           (minDiff < 10 ? "0" + minDiff : minDiff) + ":" +
           (secDiff < 10 ? "0" + secDiff : secDiff);
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
    let linesText = fs.readFileSync(textFile, "utf-8").trim().split("\n");
    let linesRate = fs.readFileSync(rateFile, "utf-8").trim().split("\n");

    let monthStr = month < 10 ? "0" + month : month.toString();
    let totalSeconds = 0;

    let dayOff = "";
    for (let line of linesRate) {
        let p = line.split(",");
        if (p[0].trim() === driverID) {
            dayOff = p[1].trim(); 
            break;
        }
    }
    for (let line of linesText) {
        let p = line.split(",");

        if (p[0].trim() === driverID) {

            let dateParts = p[2].trim().split("-");
            let year = dateParts[0];
            let m = dateParts[1];
            let day = parseInt(dateParts[2]);
            let shiftDate = new Date(`${year}-${m}-${String(day)}`);
            let dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            let shiftDayName = dayNames[shiftDate.getDay()];

                if (shiftDayName === dayOff) continue;
            if (m === monthStr) {

                if ((year === "2025" && m === "04") && day >= 10 && day <= 30)
                    totalSeconds += 6 * 3600;
                else
                    totalSeconds += (8 * 3600) + (24 * 60);
            }

        }
    }

    totalSeconds -= bonusCount * 2 * 3600;

    let h = Math.floor(totalSeconds / 3600);
    let m = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;

    return h + ":" +
        (m < 10 ? "0" + m : m) + ":" +
        (s < 10 ? "0" + s : s);
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
    let linesRate = [];
        
    linesRate = fs.readFileSync(rateFile, "utf-8").trim().split("\n");
        
    let basePay = 0;
    let tier = 0;

    for (let i = 0; i < linesRate.length; i++) {
        let parts = linesRate[i].split(",");
        if (parts[0].trim() === driverID) {
            basePay = parseInt(parts[2].trim());
            tier = parseInt(parts[3].trim());
            break;
        }
    }

    if (basePay === 0) return 0;
    
    let actualParts = actualHours.trim().split(":");
    let requiredParts = requiredHours.trim().split(":");

    let actualSec = parseInt(actualParts[0]) * 3600 + parseInt(actualParts[1]) * 60 + parseInt(actualParts[2]);
    let requiredSec = parseInt(requiredParts[0]) * 3600 + parseInt(requiredParts[1]) * 60 + parseInt(requiredParts[2]);

    let missingSec = requiredSec - actualSec;
    if (missingSec <= 0) return basePay;

    let allowedHours = 0;
    switch (tier) {
        case 1: allowedHours = 50; break;
        case 2: allowedHours = 20; break;
        case 3: allowedHours = 10; break;
        case 4: allowedHours = 3; break;
    }

    missingSec -= allowedHours * 3600;
    missingHours = Math.floor(missingSec / 3600);
    if (missingHours <= 0) return basePay;

    let deductionRatePerHour = Math.floor(basePay / 185);
    let netPay = basePay - (missingHours * deductionRatePerHour);

    if (netPay < 0) netPay = 0;
    return netPay;
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
