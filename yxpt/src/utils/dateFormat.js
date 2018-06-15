// /**
//    转换时间戳
//  *
//  */
 let DateCommon = {};
   DateCommon.getDay =function (num, str) {
        var today = new Date();
        var nowTime = today.getTime();
        var ms = 24*3600*1000*num;
        today.setTime(parseInt(nowTime + ms));
        var oYear = today.getFullYear();
        var oMoth = (today.getMonth() + 1).toString();
        if (oMoth.length <= 1) oMoth = '0' + oMoth;
        var oDay = today.getDate().toString();
        if (oDay.length <= 1) oDay = '0' + oDay;
        return oYear + str + oMoth + str + oDay;
    },
    DateCommon.transDate = function(getTimestamp){
       var  timestamp =  new Date(getTimestamp)
        return timestamp.getFullYear()+'-'+ (timestamp.getMonth() + 1)+'-'+timestamp.getDate()
    },  
    DateCommon.transferDate =function (applyTime){
        var checkTimeAll,
            timestamp  = new Date(applyTime),
            transfer = timestamp.getFullYear()+"-" + (timestamp.getMonth()+1) + "-" +timestamp.getDate();
            if (this.getDay(-1, '-') ===transfer) {
                checkTimeAll = '昨天'
            }else if (transfer === this.getDay(0, '-')){
                checkTimeAll = ''
            }else {
                checkTimeAll = transfer+" ";
            }    
        var checkTime = timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds()
        return  checkTimeAll+checkTime
    }
    export default DateCommon;
