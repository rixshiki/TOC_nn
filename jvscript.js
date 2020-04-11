var phase0 = "ระยะที่ 0 ไม่พบผู้ป่วยและการแพร่โรคในประเทศไทย", phase1 = "ระยะที่ 1 พบผู้ป่วยจากประเทศอื่น (imported cases)",
    phase2 = "ระยะที่ 2 พบการแพร่เชื้อในประเทศไทยในวงจำกัด (limited local transmission)", phase3 = "ระยะที่ 3 เป็นการแพร่เชื้อในประเทศไทยในวงกว้าง",
    allow = "การอนุญาตตรวจหาเชื้อจากกรมวิทยาศาสตร์การแพทย์", infect = "ผลการตรวจหาสารพันธุกรรมของเชื้อ (RT-PCR)",
    many = "เกิดปรากฏการติดต่อแพร่เชื้ออย่างนี้เป็นจำนวนมาก", large_area = "เกิดปรากฏการระบาดในหลากหลายพื้นที่",
    foreign = "ต้นตอการแพร่ระบาดมาจากประเทศที่มีการแพร่เชื้ออยู่ก่อนแล้ว", trap = "ใส่ค่าผิด"
var current_state = phase0
var state = ""

// function yes
function yes() {
    seq = document.getElementById("my_sequence")
    check = document.getElementById("check_state")
    accept = document.getElementById("state_accept")
    ans = document.getElementById("c_answer")
    pic = document.getElementById("pic")

    if (current_state == phase0 || current_state == phase1 ||
        current_state == phase2 || current_state == phase3) {
        current_state = trap
    }
    if (current_state == foreign) {
        current_state = phase1
    }
    if (current_state == infect) {
        current_state = foreign
    }
    if (current_state == allow) {
        current_state = infect
    }
    if (current_state == large_area) {
        current_state = phase3
    }
    if (current_state == many) {
        current_state = large_area
    }
    if (current_state == trap) {
        current_state = trap
    }

    state += "yes "

    // แสดงค่า
    pic.src = check_src(current_state)
    seq.innerHTML = state
    check.innerHTML = current_state
    ans.innerHTML = check_str(current_state)
    accept.innerHTML = check_accept(current_state)
}

function no() {
    seq = document.getElementById("my_sequence")
    check = document.getElementById("check_state")
    accept = document.getElementById("state_accept")
    pic = document.getElementById("pic")

    if (current_state == phase0 || current_state == phase1 ||
        current_state == phase2 || current_state == phase3) {
        current_state = trap
    }
    if (current_state == allow) {
        current_state = phase0
    }
    if (current_state == infect) {
        current_state = phase0
    }
    if (current_state == many) {
        current_state = phase2
    }
    if (current_state == large_area) {
        current_state = phase2
    }
    if (current_state == foreign) {
        current_state = many
    }
    if (current_state == trap) {
        current_state = trap
    }

    state += "no "

    // แสดงค่า
    pic.src = check_src(current_state)
    seq.innerHTML = state
    check.innerHTML = current_state
    ans.innerHTML = check_str(current_state)
    accept.innerHTML = check_accept(current_state)
}

function unknown() {
    seq = document.getElementById("my_sequence")
    check = document.getElementById("check_state")
    accept = document.getElementById("state_accept")
    ans = document.getElementById("c_answer")
    pic = document.getElementById("pic")

    if (current_state == phase0 || current_state == phase1 ||
        current_state == phase2 || current_state == phase3 ||
        current_state == allow || current_state == many ||
        current_state == large_area) {
        current_state = trap
    }
    if (current_state == infect) {
        current_state = infect
    }
    if (current_state == foreign) {
        current_state = many
    }
    if (current_state == trap) {
        current_state = trap
    }

    state += "unknown "

    // แสดงค่า
    pic.src = check_src(current_state)
    seq.innerHTML = state
    check.innerHTML = current_state
    ans.innerHTML = check_str(current_state)
    accept.innerHTML = check_accept(current_state)
}

function detect() {
    pic = document.getElementById("pic")
    seq = document.getElementById("my_sequence")
    check = document.getElementById("check_state")
    accept = document.getElementById("state_accept")
    ans = document.getElementById("c_answer")

    if (current_state == allow || current_state == infect ||
        current_state == many || current_state == large_area) {
        current_state = trap
    }
    if (current_state == phase0) {
        current_state = allow
    }
    if (current_state == phase1) {
        current_state = foreign
    }
    if (current_state == phase2) {
        current_state = many
    }
    if (current_state == phase3) {
        current_state = phase3
    }
    if (current_state == trap) {
        current_state = trap
    }

    state += "detect "

    // แสดงค่า
    pic.src = check_src(current_state)
    seq.innerHTML = state
    check.innerHTML = current_state
    ans.innerHTML = check_str(current_state)
    accept.innerHTML = check_accept(current_state)
}

function reset() {
    pic = document.getElementById("pic")
    seq = document.getElementById("my_sequence")
    check = document.getElementById("check_state")
    ans = document.getElementById("c_answer")
    accept = document.getElementById("state_accept")

    // reset ค่า
    current_state = phase0
    state = ""

    // แสดงค่า
    seq.innerHTML = state
    pic.src = check_src(current_state)
    check.innerHTML = current_state
    ans.innerHTML = check_str(current_state)
    accept.innerHTML = check_accept(current_state)
}

/* String Input ที่จะไม่ทำให้เข้าสู่ Trap state */
function check_str(current_state) {
    if (current_state == phase0) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Detect = พบผู้ป่วยรายใหม่'
    }
    if (current_state == phase1 || current_state == phase2 ||
        current_state == phase3) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Detect = พบผู้ติดเชื้อรายใหม่'
    }
    if (current_state == allow) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Yes = เป็นผู้ป่วยเข้าเกณฑ์ (มีอาการและเป็นกลุ่มเสี่ยง)<br>No = ไม่เป็นผู้ป่วยเข้าเกณฑ์'
    }
    if (current_state == many) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Yes = "ไม่ใช่ปรากฏเพียงรายสองราย" นายวิษณุ เครืองาม รองนายกรัฐมนตรี <br>No =  ไม่เกิดการติดต่อแพร่เชื้อเป็นจำนวนมาก'
    }
    if (current_state == large_area) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Yes = "ที่ตรงโน้นบ้าง ตรงนี้บ้าง อำเภอนั้น จังหวัดนี้"<br>นายวิษณุ เครืองาม รองนายกรัฐมนตรี <br>No = ไม่เกิดการระบาดในหลากหลายพื้นที่'
    }
    if (current_state == infect) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Yes = Positive <br>No = Negative <br>Unknown = รอผลตรวจเชื้อ'
    }
    if (current_state == foreign) {
        return 'Input ที่จะไม่ทำให้เข้าสู่ Trap state : <br>Yes = ต้นตอมาจากผู้ป่วยนำเข้าจากประเทศอื่น<br>No = ต้นตอมาจากผู้ป่วยภายในประเทศไทย <br>Unknown = ไม่สามารถหาต้นตอได้'
    }
    if (current_state == trap) {
        return 'กรุณากด Reset เพื่อออกจาก trap state และเริ่มโปรแกรมใหม่ก่อน'
    }
}

function check_accept(current_state) {
    if (current_state == trap || current_state == allow ||
        current_state == infect || current_state == many ||
        current_state == large_area || current_state == foreign) {
        document.getElementById("state_accept").setAttribute('style', "background-color: darkred");
        return "REJECT !"
    }
    else {
        document.getElementById("state_accept").setAttribute('style', "background-color: darkgreen");
        return "ACCEPT !"
    }
}

function check_src(current_state) {
    img_src = 'state/TOC (5) '
    if (current_state == phase0) {
        return img_src + '(1)' + '.png'
    }
    if (current_state == phase1) {
        return img_src + '(5)' + '.png'
    }
    if (current_state == phase2) {
        return img_src + '(6)' + '.png'
    }
    if (current_state == phase3) {
        return img_src + '(9)' + '.png'
    }
    if (current_state == allow) {
        return img_src + '(2)' + '.png'
    }
    if (current_state == infect) {
        return img_src + '(3)' + '.png'
    }
    if (current_state == foreign) {
        return img_src + '(4)' + '.png'
    }
    if (current_state == many) {
        return img_src + '(7)' + '.png'
    }
    if (current_state == large_area) {
        return img_src + '(8)' + '.png'
    }
    if (current_state == trap) {
        return img_src + '(10)' + '.png'
    }
}