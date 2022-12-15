/**格式化流量统计数据FC */
export function shiftChange(_data: number) {
    if (!_data) {
        return `-`
    }
    const sign = _data > 0 ? "" : "-";
    const data = Math.abs(_data);
    let size = "";
    if (data < 1000) {
        size = data.toFixed(2) + "B"
    } else if (data < 1000 * 1000) {
        size = (data / 1000).toFixed(2) + "KB"
    } else if (data < 1000 * 1000 * 1000) {
        size = (data / (1000 * 1000)).toFixed(2) + "MB"
    } else if (data < 1000 * 1000 * 1000 * 1000) {
        size = (data / (1000 * 1000 * 1000)).toFixed(2) + "GB"
    } else {
        size = (data / (1000 * 1000 * 1000 * 1000)).toFixed(2) + "TB"
    }
    let sizeStr = size + "";
    let index = sizeStr.indexOf(".");
    let dou = sizeStr.substr(index + 1, 2)
    if (dou === "00") {
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }

    return `${sign}${size}`;
}



/**格式化带宽统计数据FC */
export function bpsChange(data: number) {
    var size = "";
    if (data < 10000) {                            //小于0.1KB，则转化成B
        size = data.toFixed(2) + "bps"
    } else if (data > 10000 && data < 1000000) {
        size = (data / 1000).toFixed(2) + "Kbps"
    } else if (data > 1000000) {
        size = (data / 1000000).toFixed(2) + "Mbps"
    }

    var sizeStr = size + "";
    var index = sizeStr.indexOf(".");
    var dou = sizeStr.substr(index + 1, 2)
    if (dou === "00") {
        return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    }

    return size;
}




