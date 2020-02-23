// 用来把时间戳转换为时间
function add0(m) {
    return m < 10 ? "0" + m : m;
  }
  export default function format(shijianchuo) {
    //shijianchuo是整数，否则要parseInt转换
    const time = new Date(parseInt(shijianchuo));
    var y = time.getFullYear();
    var m = time.getMonth() + 1;
    var d = time.getDate();
    var h = time.getHours();
    var mm = time.getMinutes();
    var s = time.getSeconds();
    return (
      y +
      "-" +
      add0(m) +
      "-" +
      add0(d) +
      " " +
      add0(h) +
      ":" +
      add0(mm) +
      ":" +
      add0(s)
    );
  }
  